import { atom } from 'jotai';
import { GenParams, PresetData } from './utils/types';

// Offscreen canvas and Worker

export const OffscreenCanvasAtom = atom<OffscreenCanvas | null>(null);
export const RenderWorkerAtom = atom<Worker | null>(null);

// Current seed and color

export const ColorAtom = atom<string>("#887ed6");
export const SeedAtom = atom<string>("13753932482421605");

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

export const GenParamsAtom = atom<GenParams>({
    n1: 6.3, // def 10
    n2: 6.3, // def 10
    distortion: 1, // def 2
    dotDiameter: .1, // def 1
});

export const N1Atom = atom(
    (get) => get(GenParamsAtom).n1,
    (get, set, update: number) => {
        set(GenParamsAtom, {...get(GenParamsAtom), n1: update});
    }
);

export const N2Atom = atom(
    (get) => get(GenParamsAtom).n2,
    (get, set, update: number) => {
        set(GenParamsAtom, {...get(GenParamsAtom), n2: update});
    }
);

export const DistortionAtom = atom(
    (get) => get(GenParamsAtom).distortion,
    (get, set, update: number) => {
        set(GenParamsAtom, {...get(GenParamsAtom), distortion: update});
    }
);

export const DotDiameterAtom = atom(
    (get) => get(GenParamsAtom).dotDiameter,
    (get, set, update: number) => {
        set(GenParamsAtom, {...get(GenParamsAtom), dotDiameter: update});
    }
);

// Presets

export const PresetsAtom = atom<PresetData[]>([]);

export const AppendPresetAtom = atom(
    null,
    (get, set, preset: PresetData) => {
        set(PresetsAtom, [...get(PresetsAtom), preset]);
    }
);
