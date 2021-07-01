import { atom } from 'jotai';
import { atomWithCallback } from './hooks/atomsX';
import { WorkerEx } from './hooks/useCanvasWorker';
import { GENPARAMS, GenParams, I2W, I4W, NOISEPARAMS, PresetData, PRESET_H, PRESET_W, RenderParams } from './utils/types';
import { defAppSettings, storeAppParams } from './utils/storageAppConfig';
import { defPresets, storePresets } from './utils/storagePresets';
import uuid from './utils/uuid';
import { random, withDigits } from './utils/numbers';

//#region Offscreen canvas and Worker

export const OffscreenCanvasAtom = atom<OffscreenCanvas | null>(null);
export const RenderWorkerAtom = atom<WorkerEx | null>(null);

//#endregion Offscreen canvas and Worker

//#region Generator current params

// Canvas size

export const ManualSizeAtom = atom({ w: 325, h: 300 });

// GenParams

export const GenParamsAtom = atomWithCallback<GenParams>(defAppSettings.renderParams.genParams, (_, get) => storeAppParams(get));

export const N1Atom = atom(
    (get) => get(GenParamsAtom).n1,
    (get, set, update: number) => set(GenParamsAtom, { ...get(GenParamsAtom), n1: update })
);

export const N2Atom = atom(
    (get) => get(GenParamsAtom).n2,
    (get, set, update: number) => set(GenParamsAtom, { ...get(GenParamsAtom), n2: update })
);

export const DistortionAtom = atom(
    (get) => get(GenParamsAtom).distortion,
    (get, set, update: number) => set(GenParamsAtom, { ...get(GenParamsAtom), distortion: update })
);

export const DotDiameterAtom = atom(
    (get) => get(GenParamsAtom).dotDiameter,
    (get, set, update: number) => set(GenParamsAtom, { ...get(GenParamsAtom), dotDiameter: update })
);

// Current seed, color, and canvas color

export const ColorCanvasAtom = atomWithCallback(defAppSettings.canvasBg, (_, get) => storeAppParams(get));
export const ExportImageSizeAtom = atomWithCallback(defAppSettings.expSize, (_, get) => storeAppParams(get));

export const ColorAtom = atomWithCallback(defAppSettings.renderParams.color, (_, get) => storeAppParams(get));
export const SeedAtom = atomWithCallback(defAppSettings.renderParams.seed, (_, get) => storeAppParams(get));
export const NoiseAtom = atomWithCallback(defAppSettings.renderParams.noise, (_, get) => storeAppParams(get));

export const RenderParamsAtom = atom<RenderParams>(
    (get) => {
        return {
            seed: get(SeedAtom),
            noise: get(NoiseAtom),
            color: get(ColorAtom),
            genParams: get(GenParamsAtom)
        };
    }
);

export const SetRenderParamsAtom = atom(
    null,
    (_get, set, renderParams: RenderParams) => {
        set(ColorAtom, renderParams.color);
        set(SeedAtom, renderParams.seed);
        set(NoiseAtom, renderParams.noise);
        set(GenParamsAtom, renderParams.genParams);
    }
);

export const RandomSeedAtom = atom(
    null,
    (_get, set) => set(SeedAtom, `${Math.random()}`.replace(/^0\./, '')));

export const GeneratePresetAtom = atom(
    null,
    (_get, set) => {
        let newSet: GenParams = {
            n1: +withDigits(random(GENPARAMS.min.n1, GENPARAMS.gen.n1), 2),
            n2: +withDigits(random(GENPARAMS.min.n2, GENPARAMS.gen.n2), 2),
            distortion: +withDigits(random(GENPARAMS.min.distortion, GENPARAMS.gen.distortion), 2),
            dotDiameter: +withDigits(random(GENPARAMS.min.dotDiameter, GENPARAMS.gen.dotDiameter), 2),
        };
        set(GenParamsAtom, newSet);
    }
);

// Noise Editor

export const SetNoiseScaleAtom = atom(
    null,
    (get, set, { axis, value }: { axis: string, value: number; }) => {
        set(NoiseAtom, { ...get(NoiseAtom), [axis]: value });
    }
);

export const SetNoiseTypeAtom = atom(
    null,
    (get, set, value: number) => {
        set(NoiseAtom, { ...get(NoiseAtom), dim: value as 2 | 3 | 4 });
    }
);

export const ResetNoiseToDefaultAtom = atom(
    null,
    (get, set) => {
        set(NoiseAtom, NOISEPARAMS.d3.def);
    }
);

export const ShowNoiseEditorAtom = atom(false);

//#endregion Generator current params

//#region Presets

export const PresetsAtom = atomWithCallback<PresetData[]>(defPresets(), (_, get) => storePresets(get));

export const RemovePresetAtom = atom(
    null,
    (get, set, id: string) => set(PresetsAtom, get(PresetsAtom).filter((item: PresetData) => item.id !== id))
);

export const UpdatePresetPreviewAtom = atom(
    null,
    (get, set, preview: I4W.PreviewId) => {
        let reader = new FileReader();
        reader.onloadend = function () {
            if (reader.result) {
                let presets = get(PresetsAtom);
                let presetIdx = presets.findIndex((preset: PresetData) => preset.id === preview.id);
                if (presetIdx < 0) {
                    console.log('preset not found. likely removed', preview);
                    return;
                }

                const preset: PresetData = {
                    id: uuid(),
                    preview: reader.result as string,
                    renderParams: preview.renderParams,
                };
                presets[presetIdx] = preset;
                set(PresetsAtom, [...presets]);
            }
        };
        reader.readAsDataURL(preview.blob);
    }
);

export const InitPreviewsUpdateAtom = atom(
    null,
    (get) => {
        const worker = get(RenderWorkerAtom);
        const presets = get(PresetsAtom);
        const canvasSize = get(ManualSizeAtom);
        if (worker) {
            presets.forEach((preset: PresetData, index: number) => {
                if (!preset.preview) {
                    setTimeout(() => {
                        const msg: I2W.GetPreviewId = {
                            type: 'get-preview-id',
                            smallWidth: PRESET_W,
                            smallHeight: PRESET_H,
                            largeWidth: canvasSize.w,
                            largeHeight: canvasSize.h,
    
                            id: preset.id,
                            renderParams: preset.renderParams,
                        };
                        worker?.postMessage(msg);
                    }, 400 * index);
                }
            });
        }
    }
);

const AppendPresetAtom = atom(
    null,
    (get, set, preset: PresetData) => set(PresetsAtom, [...get(PresetsAtom), preset])
);

export const CreateAppendPresetAtom = atom(
    null,
    (_get, set, data: I4W.Preview) => {
        let reader = new FileReader();
        reader.onloadend = function () {
            if (reader.result) {
                const preset: PresetData = {
                    id: uuid(),
                    preview: reader.result as string,
                    renderParams: data.renderParams,
                };
                set(AppendPresetAtom, preset);
            }
        };
        reader.readAsDataURL(data.blob);
    }
);

//#endregion Presets

//#region Application background

// Set Application background

const AppBackgroundUrlRawAtom = atom('');

export const AppBackgroundUrlAtom = atom(
    (get) => get(AppBackgroundUrlRawAtom),
    (get, set, blob: Blob | null) => {
        let current = get(AppBackgroundUrlRawAtom);
        if (current) {
            window.URL.revokeObjectURL(current);
        }
        set(AppBackgroundUrlRawAtom, blob ? window.URL.createObjectURL(blob) : '');
    }
);

export const AppBackgroundActiveAtom = atom(
    (get) => !!get(AppBackgroundUrlRawAtom)
);

//#endregion Application background
