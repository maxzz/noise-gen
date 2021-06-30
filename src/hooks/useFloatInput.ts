import React from 'react';
import { constrainRange, fractionLength, getShift4Input, withDigits } from '../utils/numbers';

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

    const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(event.target.value);
        onChange(+event.target.value);
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(event.target.value);
        let n = +beautifyFloat(event.target.value);
        if (!isNaN(n)) {
            onChange(n);
        }
    };

    const onSliderKey = (event: React.KeyboardEvent) => {
    }

    const onInputKey = (event: React.KeyboardEvent) => {
        let n = +local;
        if (!isNaN(n)) {
            let shift = getShift4Input(range.step, event);
            console.log('step', range.step, 'fraction', fractionLength(range.step), 'shift', shift, 'value str', local, 'value num', n);
            shift && setLocal('' + withDigits(constrainRange(n + shift, range.min, range.max), fractionLength(range.step)));
        }
    }

    return [local, onSliderChange, onSliderKey, onInputChange, onInputKey] as const;
}
