import { atom } from 'jotai';
import { WorkerEx } from './hooks/useCanvasWorker';
import { GenParams, I4W, PresetData, RenderParams } from './utils/types';
import uuid from './utils/uuid';

// Offscreen canvas and Worker

export const OffscreenCanvasAtom = atom<OffscreenCanvas | null>(null);
export const RenderWorkerAtom = atom<WorkerEx | null>(null);

// Current seed and color

export const ColorAtom = atom<string>('#887ed6');
export const ColorCanvasAtom = atom('transparent');
export const SeedAtom = atom<string>('13753932482421605');

export const RandomSeedAtom = atom(
    (get) => get(SeedAtom),
    (_get, set) => {
        set(SeedAtom, `${Math.random()}`.replace(/^0\./, ''));
    }
);

// Current generator params

// pre-defined previews:
//-17.4,6.3,34,2.24
//-17.76,6.3,30.87,0.1
//-11.68,-13.65,116.78,0.1
//15.08,14.54,0.74,0
//-17.09,-0.45,52.13,0
//-18.17,-13.96,5.15,0
//-16.29,15.48,23.94,0.39
//-14.5,-0.27,0.95,0.62
//-2.68,-26.85,12.08,2.4
//21.3,-22.55,161.52,0.1 good for default
//6.3,6.3,321.7,1.96 good for default
//40,40,17.45,0 good for default


export const GenParamsAtom = atom<GenParams>({
    n1: 6.3, // def 10
    n2: 6.3, // def 10
    distortion: 1, // def 2
    dotDiameter: .1, // def 1
});

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

export const RenderParamsAtom = atom<RenderParams, RenderParams>(
    (get) => {
        return {
            seed: get(SeedAtom),
            color: get(ColorAtom),
            genParams: get(GenParamsAtom)
        };
    },
    (get, set, renderParams: RenderParams) => {
        set(ColorAtom, renderParams.color);
        set(SeedAtom, renderParams.seed);
        set(GenParamsAtom, renderParams.genParams);
    }
);

// Presets

export const PresetsAtom = atom<PresetData[]>([]);

const AppendPresetAtom = atom(
    null,
    (get, set, preset: PresetData) => set(PresetsAtom, [...get(PresetsAtom), preset])
);

export const RemovePresetAtom = atom(
    null,
    (get, set, id: string) => set(PresetsAtom, get(PresetsAtom).filter((item: PresetData) => item.id !== id))
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

// Canvas size

export const ManualSizeAtom = atom({ w: 325, h: 300 });

// Application background

export const AppBackgroundUrlAtom = atom('');

export const AppBackgroundActiveAtom = atom(
    (get) => !!get(AppBackgroundUrlAtom)
);

export const SetAppBackgroundUrlAtom = atom(
    null,
    (get, set, blob: Blob) => {
        let current = get(AppBackgroundUrlAtom);
        if (current) {
            window.URL.revokeObjectURL(current);
        }
        set(AppBackgroundUrlAtom, window.URL.createObjectURL(blob));
    }
);