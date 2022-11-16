import { RenderParams } from "./data-render-params";

export type WH = {
    w: number;
    h: number;
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
