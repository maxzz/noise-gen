import React from 'react';

function beautifyFloat(v: string) {
    return (v || '').trim().replace(/ /g, '').replace(/^\./, '0.').replace(/\.$/, '.0');
}

export default function useFloatInput(initialValue: number, onChange: (value: number) => void) {
    const [local, setLocal] = React.useState('' + initialValue); // TODO: that is not NaN

    const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(event.target.value);
        onChange(+event.target.value);
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(event.target.value);
        let n = +beautifyFloat(event.target.value);
        if (!isNaN(n)) {
            onChange(n);
        }
    }    
    
    return [local, onSliderChange, onInputChange] as const;
}
