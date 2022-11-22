import { atom } from "jotai";
import { AxisKey, NOISEPARAMS } from "@/store/types";
import { NoiseAtom } from "./params-editor";

// Noise Editor

export const SetNoiseScaleAtom = atom(
    null,
    (get, set, { axis, value }: { axis: AxisKey, value: number; }) => {
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
