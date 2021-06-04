import { atom } from 'jotai';
import { GenParams } from '../src/utils/web-worker';

export const OffscreenCanvasAtom = atom<OffscreenCanvas | null>(null);
export const RenderWorkerAtom = atom<Worker | null>(null);

export const SeedAtom = atom<string>("13753932482421605");
export const ColorAtom = atom<string>("#887ed6");

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

export const PreviewsAtom = atom<string[]>([]);

export const AddPreviewAtom = atom(
    null,
    (get, set, preview: string) => {
        set(PreviewsAtom, [...get(PreviewsAtom), preview]);
    }
);
