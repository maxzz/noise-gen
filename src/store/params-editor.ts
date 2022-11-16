import { atom } from "jotai";
import { atomWithCallback } from "@/hooks/atomsX";
import { random, withDigits } from "@/utils";
import { defAppSettings, storeAppParams } from "./storageAppConfig";
import { GenParams, GENPARAMS, RenderParams } from "./types";
import { GenParamsAtom } from "./params-gen";

// Current seed, color, and canvas color

export const ColorCanvasAtom = atomWithCallback(defAppSettings.canvasBg, ({get}) => storeAppParams(get));
export const ExportImageSizeAtom = atomWithCallback(defAppSettings.expSize, ({get}) => storeAppParams(get));

export const ColorAtom = atomWithCallback(defAppSettings.renderParams.color, ({get}) => storeAppParams(get));
export const SeedAtom = atomWithCallback(defAppSettings.renderParams.seed, ({get}) => storeAppParams(get));
export const NoiseAtom = atomWithCallback(defAppSettings.renderParams.noise, ({get}) => storeAppParams(get));

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
