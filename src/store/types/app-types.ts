import { RenderParams } from "./data-render-params";

export type WH = {
    w: number;
    h: number;
};

export type AppConfig = {
    canvasBg: string;
    expSize: WH;
    renderParams: RenderParams;
};
