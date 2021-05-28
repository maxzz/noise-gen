import { atom } from 'jotai';

export const offscreenCanvasAtom = atom<OffscreenCanvas | null>(null);

export const seedAtom = atom<string>("13753932482421605");
export const colorAtom = atom<string>("#1a00da");
