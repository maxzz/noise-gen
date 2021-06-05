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
        data: (Run | GetPreview) & {
            canvas: OffscreenCanvas;
            width: number;
            height: number;
        };
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
        dimention: number;
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
