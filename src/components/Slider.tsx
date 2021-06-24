import React from 'react';
import useFloatInput from '../hooks/useFloatInput';
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
    const [local, onSliderChange, onInputChange] = useFloatInput(value, onChange); // TODO: what to do with NaN?
    return (
        <div className="px-2 w-full h-5 flex items-center justify-center space-x-2 text-xs text-purple-900">
            <div className="flex-none" style={{ width: labelWidth }}>{label}</div>
            <input
                className="ui-slider"
                type="range"
                min={min} max={max} step={step}
                value={value}
                onChange={onSliderChange}
            />
            <input className="w-8 bg-purple-100 text-[.6rem]"
                value={local}
                onChange={onInputChange}
            />
        </div>
    );
}

export function SmallSlider({ label, min, max, step = .01, labelWidth = '4.5rem', value, onChange }: SliderProps) {
    const [local, onSliderChange, onInputChange] = useFloatInput(value, onChange); // TODO: what to do with NaN?
    return (
        <div className="px-2 w-full h-4 flex items-center justify-center space-x-2 text-[.6rem] text-purple-900">
            <div className="flex-none" style={{ width: labelWidth }}>{label}</div>
            <input
                className="ui-slider"
                type="range"
                min={min} max={max} step={step}
                value={value}
                onChange={onSliderChange}
            />
            <input className="w-8 bg-purple-100 text-[.6rem]"
                value={local}
                onChange={onInputChange}
            />
        </div>
    );
}

export default Slider;
