import { WH } from "./app-types";
import { RenderParams } from "./data-render-params";

export type AppConfig = {
    canvasBg: string;
    expSize: WH;
    renderParams: RenderParams;
};
