import { atom } from "jotai";
import { atomWithCallback } from "@/hooks/atomsX";
import { defAppSettings, storeAppParams } from "../io/storageAppConfig";
import { GenParams } from "@/store/types";

// GenParams

export const GenParamsAtom = atomWithCallback<GenParams>(defAppSettings.renderParams.genParams, ({get}) => storeAppParams(get));

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
