import { GenParams } from "./data-gen-params";
import { NoiseParams } from "./data-noise-params";

export type WH = {
    w: number;
    h: number;
};

export type RenderParams = {
    seed: string;
    color: string;
    noise: NoiseParams;
    genParams: GenParams;
};

export type PresetData = {
    id: string;                 // preset unique ID (auto-generated).
    preview?: string;           // preview image url (auto-generated).
    renderParams: RenderParams;
};

export type AppConfig = {
    canvasBg: string;
    expSize: WH;
    renderParams: RenderParams;
};
