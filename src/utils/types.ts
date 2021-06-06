export type GenParams = {
    n1: number;
    n2: number;
    distortion: number;
    dotDiameter: number;
};

export type RenderParams = {
    seed: string;
    color: string;
    genParams: GenParams;
};

export type PresetData = {
    id: string;
    preview?: string;
    renderParams: RenderParams;
};

export namespace I2W { // To Worker
    export type Message = {
        data: (Init | Run | GetPreview) & {
            width: number;
            height: number;
        };
    };

    export type Init = {
        type: 'init';
        canvas: OffscreenCanvas;
    };

    export type Run = {
        type: 'run';
        seed: string;
        color: string;
        width: number;
        height: number;
        params: GenParams;
    };

    export type GetPreview = {
        type: 'get-preview';
        smallWidth: number;
        smallHeight: number;
    };
}

export namespace I4W { // From Worker
    export type Message = {
        data: Preview;
    };

    export type Preview = {
        type: 'preview-blob';
        blob: Blob,
        renderParams: RenderParams;
    };
}
