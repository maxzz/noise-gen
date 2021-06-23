import React from 'react';
import './Sliders.scss';

export interface SliderProps {
    label: string;
    min: number;
    max: number;
    step?: number;
    value: number;
    labelWidth?: string;
    onChange: (value: number) => void;
}

function Slider({ label, min, max, step = .01, labelWidth = '4.5rem', value, onChange}: SliderProps) {
    return (
        <div className="px-2 w-full h-5 flex items-center justify-center space-x-2 text-xs text-purple-900">
            <div className="flex-none" style={{ width: labelWidth }}>{label}</div>
            <input
                className="ui-slider" type="range"
                value={value} onChange={(event) => onChange(+event.target.value)}
                min={min} max={max} step={step}
            />
            <input className="w-8 bg-purple-100 text-[.6rem]"
                value={value} onChange={(event) => onChange(+event.target.value)}
            />
        </div>
    );
}

export default Slider;
