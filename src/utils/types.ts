export type GenParams = {
    n1: number;
    n2: number;
    distortion: number;
    dotDiameter: number;
};

export type NoiseParamsOld = {
    type: 2 | 3 | 4;
    scaleX: number;
    scaleY: number;
    scaleZ?: number;
};

export type NoiseParams = [number, number, number, number];

export type RenderParams = {
    seed: string;
    color: string;
    genParams: GenParams;
};

type GenParamsLimits = {
    min: GenParams; // minimum for both: manual and random
    max: GenParams; // maximum for manual
    gen: GenParams; // apply stricter limits on random values
};

export const GENPARAMS: GenParamsLimits = {
    min: {
        n1: -40,
        n2: -40,
        distortion: 0,
        dotDiameter: 0,
    },
    max: {
        n1: 40,
        n2: 40,
        distortion: 400,
        dotDiameter: 50,
    },
    gen: {
        n1: 40,
        n2: 40,
        distortion: 400,
        dotDiameter: 1,
    },
};

export type PresetData = {
    id: string;                 // preset unique ID (auto-generated).
    preview?: string;           // preview image url (auto-generated).
    renderParams: RenderParams;
};

export const STORAGE_KEY = 'noisegen-xp10525n';

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

        id: string;
        renderParams: RenderParams;
    };

    export type GetImage = {
        type: 'get-image';
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

// packing / unpacking

//#region RenderParams packing

export function renderParams2Store(v: RenderParams): string {
    let arr = [v.color, v.seed, v.genParams.n1, v.genParams.n2, v.genParams.distortion, v.genParams.dotDiameter];
    return `v7|${arr.join('|')}`;
}

export function renderParams4Store(packed: string): RenderParams | undefined {
    let arr = (packed || '').split('|');
    if (arr.length !== 7 || arr[0] !== 'v7') {
        return;
    }
    let v: RenderParams = {
        color: arr[1],
        seed: arr[2],
        genParams: {
            n1: +arr[3],
            n2: +arr[4],
            distortion: +arr[5],
            dotDiameter: +arr[6],
        }
    };
    return v;
}

//#endregion RenderParams packing
