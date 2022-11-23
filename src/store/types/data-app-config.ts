import { WH } from "./app-types";
import { RenderParams } from "./data-render-params";
import { UiOptions } from "./data-ui-options";

export type AppConfig = {
    canvasBg: string;
    expSize: WH;
    renderParams: RenderParams;
    uiOptions: UiOptions;
};
