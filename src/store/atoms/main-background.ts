import { atom } from "jotai";

// Set Application background

const AppBackgroundUrlRawAtom = atom('');

export const AppBackgroundUrlAtom = atom(
    (get) => get(AppBackgroundUrlRawAtom),
    (get, set, blob: Blob | null) => {
        let current = get(AppBackgroundUrlRawAtom);
        if (current) {
            window.URL.revokeObjectURL(current);
        }
        set(AppBackgroundUrlRawAtom, blob ? window.URL.createObjectURL(blob) : '');
    }
);

export const AppBackgroundActiveAtom = atom(
    (get) => !!get(AppBackgroundUrlRawAtom)
);
