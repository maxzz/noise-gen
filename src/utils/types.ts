export type GenParams = {
    n1: number;
    n2: number;
    distortion: number;
    dotDiameter: number;
};

export type NoiseParams = {
    dim: 2 | 3 | 4; // Noise dimension 2D, 3D, 4D.
    x: number;      // scale x, def is 1 if unused.
    y: number;      // scale y, def is 1 if unused.
    z: number;      // scale z, def is 1 if unused.
    w: number;      // scale w, def is 1 if unused.
};

//export type NoiseParamsRaw = [number, number, number, number, number];

export type RenderParams = {
    seed: string;
    color: string;
    noise: NoiseParams;
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

export type NoiseParamsSet = {
    def: NoiseParams;
    min: NoiseParams;
    max: NoiseParams;
    gen: NoiseParams;
};

export type NoiseParamsLimits = {
    d2: NoiseParamsSet;
    d3: NoiseParamsSet;
    d4: NoiseParamsSet;
};

export const NOISEPARAMS: NoiseParamsLimits = {
    d2: {
        def: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        min: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        max: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        gen: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    },
    d3: {
        def: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        min: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        max: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        gen: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    },
    d4: {
        def: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        min: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        max: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
        gen: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    },
};

export type PresetData = {
    id: string;                 // preset unique ID (auto-generated).
    preview?: string;           // preview image url (auto-generated).
    renderParams: RenderParams;
};

export const PRESET_W = 56;
export const PRESET_H = 56;
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
        largeWidth: number;
        largeHeight: number;

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

//#region Seed, Noise packing

export function noiseParams2Store(seed: string, n?: NoiseParams): string {
    return n ? ['v7', n.dim, n.x, n.y, n.z, n.w, seed].join('_') : seed; // TODO: compare to def, don't save def
}

export function noiseParams4Store(seed: string = ''): { seed: string; noise: NoiseParams; } {
    const def = {
        seed: seed,
        noise: NOISEPARAMS.d3.def
    };
    if (seed.match(/^v7/)) {
        let arr = seed.split('_');
        if (arr.length >= 6) {
            let d = +arr[1];
            let dim = (d !== 2 && d !== 3 && d !== 4 ? 3 : d) as 2 | 3 | 4;
            def.noise = {
                dim,
                x: +arr[2],
                y: +arr[3],
                z: +arr[4],
                w: +arr[5],
            };
        }
        if (arr.length >= 7) {
            def.seed = arr.slice(6).join('');
        }
    }
    return def;
}

//#endregion Seed, Noise packing

//#region RenderParams packing

export type AppConfig = {
    canvasBg: string;
    renderParams: RenderParams;
};

export const APPCONFIG: AppConfig = {
    canvasBg: 'transparent',
    renderParams: {
        seed: '13753932482421605',
        color: '#887ed6',
        noise: NOISEPARAMS.d3.def,
        genParams: {
            n1: 6.3, // def 10
            n2: 6.3, // def 10
            distortion: 1, // def 2
            dotDiameter: .1, // def 1
        }
    }
};

export function renderParams2Store(v: RenderParams): string {
    return ['v7', v.color, noiseParams2Store(v.seed, v.noise), v.genParams.n1, v.genParams.n2, v.genParams.distortion, v.genParams.dotDiameter].join('|');
}

export function renderParams4Store(packed: string): RenderParams | undefined {
    let arr = (packed || '').split('|');
    if (arr.length !== 7 || arr[0] !== 'v7') {
        return;
    }
    let v: RenderParams = {
        color: arr[1],
        ...noiseParams4Store(arr[2]),
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
