import React from 'react';
import { constrainRange, getShift4Input } from '../utils/numbers';

function beautifyFloat(v: string) {
    return (v || '').trim().replace(/ /g, '').replace(/^\./, '0.').replace(/\.$/, '.0');
}

export type InputRange = {
    min: number;
    max: number;
    step: number;
};

export default function useFloatInput(value: number, range: InputRange, onChange: (newValue: number) => void) {
    const [local, setLocal] = React.useState('' + value); // TODO: that is not NaN

    React.useEffect(() => {
        setLocal('' + value);
    }, [value]);

    function setLocalValue(s: string): void {
        setLocal(s);
        let n = +beautifyFloat(s);
        if (!isNaN(n)) {
            onChange(n);
        }
    }

    const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(event.target.value);
        onChange(+event.target.value);
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(event.target.value);
    };

    const onInputKey = (event: React.KeyboardEvent) => {
        let n = +local;
        if (!isNaN(n)) {
            let shift = getShift4Input(range.step, event);
            shift && setLocalValue('' + constrainRange(+(n + shift).toFixed(4), range.min, range.max));
        }
    };

    return [local, onSliderChange, onInputChange, onInputKey] as const;
}
