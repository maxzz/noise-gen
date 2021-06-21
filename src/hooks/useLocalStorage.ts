import { atom, WritableAtom } from 'jotai';

export function atomWithCallback<Value>(initialValue: Value, onValueChange: (nextValue: Value) => void): WritableAtom<Value, Value> {
    const baseAtom = atom(initialValue);
    const derivedAtom = atom<Value, Value>(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;
            set(baseAtom, nextValue);
            onValueChange(nextValue);
        }
    );
    return derivedAtom;
}

/*
export function atomWithLocalStorage<Value>(key: string, initialValue: Value, onValueChange: (nextValue: Value) => void): WritableAtom<Value, Value> {
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
*/