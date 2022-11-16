export type GenParams = {
    n1: number;
    n2: number;
    distortion: number;
    dotDiameter: number;
};

export type GenParamsLimits = {
    min: GenParams; // minimum for both: manual and random
    max: GenParams; // maximum for manual
    gen: GenParams; // apply stricter limits on random values
};
