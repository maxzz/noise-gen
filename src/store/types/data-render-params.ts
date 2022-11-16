import { GenParams } from "./data-gen-params";
import { NoiseParams } from "./data-noise-params";

export type RenderParams = {
    seed: string;
    color: string;
    noise: NoiseParams;
    genParams: GenParams;
};
