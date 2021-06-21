import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { defAppSettings, STORAGE_KEY, storeChangesDebounced } from './components/LocalStore';
import { WorkerEx } from './hooks/useCanvasWorker';
import { GENPARAMS, GenParams, I4W, PresetData, RenderParams } from './utils/types';
import uuid from './utils/uuid';

//#region Offscreen canvas and Worker

export const OffscreenCanvasAtom = atom<OffscreenCanvas | null>(null);
export const RenderWorkerAtom = atom<WorkerEx | null>(null);

//#endregion Offscreen canvas and Worker

// Current generator params

//#region RenderParams, GenParams,  Current seed, color, and canvas color

export const RenderParamsAtom = atom<RenderParams, RenderParams>(
    (get) => {
        //console.log('get RenderParamsAtom');

        return {
            seed: get(SeedAtom),
            color: get(ColorAtom),
            genParams: get(GenParamsAtom)
        };
    },
    (_get, set, renderParams: RenderParams) => {
        //console.log('set RenderParamsAtom');

        set(ColorAtom, renderParams.color);
        set(SeedAtom, renderParams.seed);
        set(GenParamsAtom, renderParams.genParams);
    }
);

RenderParamsAtom.onMount = (setAtom) => {
    //console.log('RenderParamsAtom.onMount');
    setAtom(defAppSettings.renderParams);
};

// GenParams

export const GenParamsRawAtom = atom<GenParams>({
    n1: 6.3, // def 10
    n2: 6.3, // def 10
    distortion: 1, // def 2
    dotDiameter: .1, // def 1
});

export const GenParamsAtom = atom(
    (get) => get(GenParamsRawAtom),
    (get, set, params: GenParams) => {
        //console.log('set GenParamsAtom');

        set(GenParamsRawAtom, params);
        storeChangesDebounced(get);
    }
);

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

export const ColorRawAtom = atom('#887ed6');
export const ColorCanvasRawAtom = atom('transparent');
export const SeedRawAtom = atom('13753932482421605');

export const ColorAtom = atom(
    (get) => get(ColorRawAtom),
    (get, set, update: string) => {
        set(ColorRawAtom, update);
        storeChangesDebounced(get);
    }
);
export const ColorCanvasAtom = atom(
    (get) => get(ColorCanvasRawAtom),
    (get, set, update: string) => {
        set(ColorCanvasRawAtom, update);
        storeChangesDebounced(get);
    }
);
export const SeedAtom = atom(
    (get) => get(SeedRawAtom),
    (get, set, update: string) => {
        set(SeedRawAtom, update);
        storeChangesDebounced(get);
    }
);

export const RandomSeedAtom = atom(
    (get) => get(SeedAtom),
    (_get, set) => set(SeedAtom, `${Math.random()}`.replace(/^0\./, '')));

function Random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export const GeneratePresetAtom = atom(
    null,
    (_get, set) => {
        let newSet: GenParams = {
            n1: Random(GENPARAMS.min.n1, GENPARAMS.gen.n1),
            n2: Random(GENPARAMS.min.n2, GENPARAMS.gen.n2),
            distortion: Random(GENPARAMS.min.distortion, GENPARAMS.gen.distortion),
            dotDiameter: Random(GENPARAMS.min.dotDiameter, GENPARAMS.gen.dotDiameter),
        };
        set(GenParamsAtom, newSet);
    }
);

//#endregion RenderParams, GenParams,  Current seed, color, and canvas color

//#region Presets

export const PresetsAtom = atomWithStorage<PresetData[]>(`${STORAGE_KEY}-presets`, []);

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

//#endregion Presets

// Canvas size

export const ManualSizeAtom = atom({ w: 325, h: 300 });

//#region Application background

// Set Application background

const _AppBackgroundUrlAtom = atom('');

export const AppBackgroundUrlAtom = atom(
    (get) => get(_AppBackgroundUrlAtom),
    (get, set, blob: Blob | null) => {
        let current = get(_AppBackgroundUrlAtom);
        if (current) {
            window.URL.revokeObjectURL(current);
        }
        set(_AppBackgroundUrlAtom, blob ? window.URL.createObjectURL(blob) : '');
    }
);

export const AppBackgroundActiveAtom = atom(
    (get) => !!get(_AppBackgroundUrlAtom)
);

//#endregion Application background
