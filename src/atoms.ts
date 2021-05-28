import { atom } from 'jotai';

export const offscreenCanvasAtom = atom<OffscreenCanvas | null>(null);

export const seedAtom = atom<string>('tm');
export const colorAtom = atom<string>('red');
