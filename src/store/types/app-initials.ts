import { AppConfig, NoiseParamsLimits, RenderParams, WH } from ".";

export const PRESET_W = 56;
export const PRESET_H = 56;

export const STORAGE_KEY = 'noisegen-xp10525n';

// packing / unpacking

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

//#region RenderParams packing

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

//#endregion RenderParams packing
