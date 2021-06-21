import { atom, WritableAtom } from 'jotai';

export function atomWithLocalStorage<Value>(key: string, initialValue: Value): WritableAtom<Value, Value> {
    const getInitialValue = () => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem(key);
            if (item !== null) {
                if (Array.isArray(initialValue)) {
                    console.log(JSON.parse(item).map((i: any) => atomWithLocalStorage<Value>(i.id, i)));
                    return JSON.parse(item).map((i: any) => atomWithLocalStorage<Value>(i.id, i));
                }
                return JSON.parse(item);
            }
            return initialValue;
        }
    };
    const baseAtom = atom(getInitialValue());
    const derivedAtom = atom<Value, Value>(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;
            set(baseAtom, nextValue);
            // console.log(key, initialValue,Array.isArray(initialValue))
            if (typeof window !== "undefined") {
                if (Array.isArray(initialValue)) {
                    localStorage.setItem(key, JSON.stringify(nextValue.map(get)));
                } else {
                    localStorage.setItem(key, JSON.stringify(nextValue));
                }
            }
        }
    );
    return derivedAtom;
}
