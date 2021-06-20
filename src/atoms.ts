import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {focusAtom} from 'jotai/optics';
import { WorkerEx } from './hooks/useCanvasWorker';
import { GENPARAMS, GenParams, I4W, PresetData, RenderParams } from './utils/types';
import uuid from './utils/uuid';

//#region Offscreen canvas and Worker

export const OffscreenCanvasAtom = atom<OffscreenCanvas | null>(null);
export const RenderWorkerAtom = atom<WorkerEx | null>(null);

//#endregion Offscreen canvas and Worker

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
//21.3,-36.51,13.87,0.73 good for default
//{"canvasBg":"black","renderParams":{"seed":"43780585678984507","color":"rgba(212,133,30,1)","genParams":{"n1":31.95,"n2":-24.52,"distortion":106.94,"dotDiameter":0.5}}}

const STORAGE_KEY = 'noise-gen-xp10-525n';

type AppConfig = {
    canvasBg: string;
    renderParams: RenderParams;
};

const AppConfigAtom = atomWithStorage<AppConfig>(`${STORAGE_KEY}-params`, {
    canvasBg: 'transparent',
    renderParams: {
        seed: '13753932482421605',
        color: '#887ed6',
        genParams: {
            n1: 6.3, // def 10
            n2: 6.3, // def 10
            distortion: 1, // def 2
            dotDiameter: .1, // def 1
        }
    }
});

//#region RenderParams, GenParams,  Current seed, color, and canvas color

//export const RenderParamsAtom = selectAtom(AppConfigAtom, (config) => config.renderParams);

export const RenderParamsAtom = focusAtom(AppConfigAtom, (optic) => optic.prop('renderParams'));
/*
export const RenderParamsAtom = atom(
    (get) => {
        let v= get(AppConfigAtom).renderParams;
        console.log('RenderParamsAtom read', v);
        return v;
    },
    (get, set, params: RenderParams) => {
        console.log('RenderParamsAtom write', params);

        set(AppConfigAtom, { ...get(AppConfigAtom), renderParams: params });

        // set(SeedAtom, params.seed);
        // set(ColorAtom, params.color);
        // set(GenParamsAtom, params.genParams);
    }
);
*/
// GenParams

export const GenParamsAtom = focusAtom(AppConfigAtom, (optic) => optic.prop('renderParams').prop('genParams'));
/*
const GenParamsAtom = atom(
    (get) => {
        let v = get(RenderParamsAtom).genParams;
        console.log('GenParamsAtom read', v);
        return v;
    },
    //(get) => get(AppConfigAtom).renderParams.genParams,
    (get, set, params: GenParams) => {
        console.log('GenParamsAtom write', params);

        set(RenderParamsAtom, { ...get(RenderParamsAtom), genParams: params });

        // let ac = get(AppConfigAtom);
        // ac.renderParams.genParams = params;
        // set(AppConfigAtom, ac);
    }
);
*/

export const N1Atom = focusAtom(AppConfigAtom, (optic) => optic.prop('renderParams').prop('genParams').prop('n1'));
/*
export const N1Atom = atom(
    (get) => {
        let v = get(GenParamsAtom).n1;
        console.log('N1Atom read', v);
        return v;
    },
    (get, set, update: number) => {
        console.log('N1Atom write', update);

        set(GenParamsAtom, { ...get(GenParamsAtom), n1: update });
    }
);
*/
export const N2Atom = atom(
    (get) => {
        let v = get(GenParamsAtom).n2;
        console.log('N2Atom read', v);
        return v;
    },
    (get, set, update: number) => {
        console.log('N2Atom write', update);

        set(GenParamsAtom, { ...get(GenParamsAtom), n2: update });
    }
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

export const ColorAtom = atom(
    (get) => get(RenderParamsAtom).color,
    (get, set, color: string) => set(RenderParamsAtom, { ...get(RenderParamsAtom), color: color })
);

export const ColorCanvasAtom = atom(
    (get) => get(AppConfigAtom).canvasBg,
    (get, set, color: string) => set(AppConfigAtom, { ...get(AppConfigAtom), canvasBg: color })
);

export const SeedAtom = atom(
    (get) => {
        let v = get(RenderParamsAtom).seed;
        console.log('SeedAtom read', v);
        return v;
    },
    (get, set, seed: string) => {
        console.log('SeedAtom write', seed);
        set(RenderParamsAtom, { ...get(RenderParamsAtom), seed: seed })
    }
);

export const RandomSeedAtom = atom(
    (get) => get(SeedAtom),
    (_get, set) => set(SeedAtom, `${Math.random()}`.replace(/^0\./, ''))
);

function Random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export const GeneratePresetAtom = atom(
    null,
    (_get, set) => {
        set(N1Atom, Random(GENPARAMS.min.n1, GENPARAMS.gen.n1));
        set(N2Atom, Random(GENPARAMS.min.n2, GENPARAMS.gen.n2));
        set(DistortionAtom, Random(GENPARAMS.min.distortion, GENPARAMS.gen.distortion));
        set(DotDiameterAtom, Random(GENPARAMS.min.dotDiameter, GENPARAMS.gen.dotDiameter));
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
