import { atom, WritableAtom } from 'jotai';

export function atomWithLocalStorage<Value>(key: string, initialValue: Value): WritableAtom<Value, Value> {
    const baseAtom = atom(initialValue);
    const derivedAtom = atom<Value, Value>(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;
            set(baseAtom, nextValue);

            localStorage.setItem(key, JSON.stringify(nextValue));
        }
    );
    return derivedAtom;
}
