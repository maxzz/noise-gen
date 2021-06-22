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

export const STORAGE_KEY = 'noise-gen-xp10-525n';

//#region Worker

export namespace I2W { // To Worker
    export type Message = {
        data: Init | Run | GetPreview | GetImage;
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

    export type GetPreview = {
        type: 'get-preview';
        smallWidth: number;
        smallHeight: number;
    };

    export type GetImage = {
        type: 'get-image';
        promiseId: string;
    };
}

export namespace I4W { // From Worker
    export type Message = {
        data: Preview | Image;
    };

    export type Preview = {
        type: 'preview-blob';
        blob: Blob,
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
