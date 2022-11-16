import { NoiseParams, NOISEPARAMS, RenderParams } from ".";

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
