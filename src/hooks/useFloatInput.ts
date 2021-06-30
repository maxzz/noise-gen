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
        console.log('input useEffect', value);
    }, [value]);

    function setLocalValue(s: string): void {
        console.log('setLocalValue', s);

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

    const onSliderKey = (event: React.KeyboardEvent) => {
    };

    const onInputKey = (event: React.KeyboardEvent) => {
        let n = +local;
        if (!isNaN(n)) {
            let shift = getShift4Input(range.step, event);
            if (shift) {
                let newN = (n * 10000 + shift * 10000) / 10000;

                let stepfraction = fractionLength(range.step);
                let shiftfraction = fractionLength(newN);

                console.log('local', local, 'n', n, 'newN', newN, 'shift', shift, 'step', range.step);

                // -0.09 + -0.01 = -0.09999999999999999
                // 0.07 + -0.01 = 0.060000000000000005
                // (0.07 * 10000  + -0.01 * 10000) / 10000 = 0.06000000000000001

                // let stepfraction = fractionLength(range.step);
                // let shiftfraction = fractionLength(newN);
                // let cut = Math.max(stepfraction, shiftfraction);

                // console.log('step', range.step, 'shift', shift, 'shiftFraction', shiftfraction, 'value str', local, 'value num', n);

                // if (shiftfraction > stepfraction) {
                //     newN = +local.replace(/0$/, '');
                //     console.log('set n', newN);
                // }
    
                //setLocal('' + constrainRange(newN, range.min, range.max));
                setLocalValue('' + constrainRange(newN, range.min, range.max));
            }
        }
    };

    return [local, onSliderChange, onSliderKey, onInputChange, onInputKey] as const;
}
