import { RenderParams, WH } from ".";

//#region Worker

export namespace I2W { // To Worker
    export type Message = {
        data: Init | Run | GetPreview | GetPreviewId | GetImage;
    };

    export type Init = {
        type: 'init';
        canvas: OffscreenCanvas;
    };

    export type Run = {
        type: 'run';
        canvasWidth: number;
        canvasHeight: number;
        renderParams: RenderParams;
    };

    export type GetPreview = {      // Preview for newly created images
        type: 'get-preview';        // the reply is 'preview-blob'
        smallWidth: number;
        smallHeight: number;
    };

    export type GetPreviewId = {    // Preview for loaded from storage presets
        type: 'get-preview-id';     // the reply is 'preview-blob-id'
        smallWidth: number;
        smallHeight: number;
        largeWidth: number;
        largeHeight: number;

        id: string;
        renderParams: RenderParams;
    };

    export type GetImage = {
        type: 'get-image';
        size?: WH;
        promiseId: string;
    };
}

export namespace I4W { // From Worker
    export type Message = {
        data: Preview | PreviewId | Image;
    };

    export type Preview = {         // Preview for newly created images
        type: 'preview-blob';       // the reply to 'get-preview'
        blob: Blob;
        renderParams: RenderParams;
    };

    export type PreviewId = {       // Preview for loaded from storage presets
        type: 'preview-blob-id';    // the reply to 'get-preview-id'
        blob: Blob;

        id: string;
        renderParams: RenderParams;
    };

    export type Image = {
        type: 'got-image';
        blob: Blob,
        resolveId: string;
    };
}

//#endregion Worker
