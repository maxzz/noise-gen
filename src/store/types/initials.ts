// packing / unpacking

import { NoiseParams, NoiseParamsLimits, RenderParams, WH } from ".";

export const NOISEPARAMS: NoiseParamsLimits = {
    // d2: {
    //     def: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    //     min: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    //     max: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    //     gen: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    // },
    d3: {
        def: { dim: 3, x: 0.1, y: 0.1, z: 0.1, w: 0.1, },
        min: { dim: 3, x: 0.001, y: 0.001, z: 0.001, w: 0.001, },
        max: { dim: 3, x: 20, y: 20, z: 20, w: 20, },
        gen: { dim: 3, x: 0.1, y: 0.1, z: 0.1, w: 0.1, }, // not used
    },
    // d4: {
    //     def: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    //     min: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    //     max: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    //     gen: { dim: 2, x: 0.01, y: 0.01, z: 0.01, w: 0.01, },
    // },
};

//#region Seed, Noise packing

function noiseParams2Store(seed: string, n?: NoiseParams): string {
    return n ? ['v7', n.dim, n.x, n.y, n.z, n.w, seed].join('_') : seed; // TODO: compare to def, don't save def
}

function noiseParams4Store(seed: string = ''): { seed: string; noise: NoiseParams; } {
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
    expSize: WH;
    renderParams: RenderParams;
};

export const APPCONFIG: AppConfig = {
    canvasBg: 'transparent',
    expSize: { w: 325, h: 300 },
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
