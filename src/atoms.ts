import { atom } from 'jotai';
import { RenderParams } from '../src/utils/web-worker';

export const offscreenCanvasAtom = atom<OffscreenCanvas | null>(null);

export const seedAtom = atom<string>("13753932482421605");
export const colorAtom = atom<string>("#887ed6");

export const renderParamsAtom = atom<RenderParams>({
    n1: 6.3, // def 10
    n2: 6.3, // def 10
    distortion: 1, // def 2
    dotDiameter: .1, // def 1
    color: 'red'
});
