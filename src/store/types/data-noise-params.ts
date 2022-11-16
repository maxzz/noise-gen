export type NoiseParams = {
    dim: 2 | 3 | 4; // Noise dimension 2D, 3D, 4D.
    x: number;      // scale x, def is 1 if unused.
    y: number;      // scale y, def is 1 if unused.
    z: number;      // scale z, def is 1 if unused.
    w: number;      // scale w, def is 1 if unused.
};

//export type NoiseParamsRaw = [number, number, number, number, number];

export type NoiseParamsSet = {
    def: NoiseParams;
    min: NoiseParams;
    max: NoiseParams;
    gen: NoiseParams;
};

export type NoiseParamsLimits = {
    //d2: NoiseParamsSet;
    d3: NoiseParamsSet;
    //d4: NoiseParamsSet;
};
