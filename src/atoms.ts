import { atom } from 'jotai';

export const offscreenCanvasAtom = atom<OffscreenCanvas | null>(null);

export const seedAtom = atom<string>('');
export const colorAtom = atom<string>('green');
