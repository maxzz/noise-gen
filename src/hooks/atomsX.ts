import { atom, Getter, WritableAtom } from 'jotai';

export function atomWithCallback<Value>(initialValue: Value, onValueChange: (nextValue: Value, get: Getter) => void): WritableAtom<Value, Value> {
    const baseAtom = atom(initialValue);
    const derivedAtom = atom<Value, Value>(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;
            set(baseAtom, nextValue);
            onValueChange(nextValue, get);
        }
    );
    return derivedAtom;
}
