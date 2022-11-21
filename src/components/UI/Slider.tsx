import React from 'react';
import { useFloatInput } from '@/hooks/useFloatInput';
import './Slider.scss';

export interface SliderProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    step?: number;
    labelWidth?: string;
}

export function Slider({ label, min, max, step = .01, labelWidth = '4.5rem', value, onChange }: SliderProps) {
    const [local, onSliderChange, onInputChange, onInputKey] = useFloatInput(value, { min, max, step }, onChange); // TODO: what to do with NaN?
    return (
        <div className="px-2 w-full h-5 text-xs flex-centered space-x-2 text-purple-900">
            <div className="flex-none" style={{ width: labelWidth }}>{label}</div>
            <input
                className="ui-slider"
                type="range"
                min={min} max={max} step={step}
                value={value}
                tabIndex={-1}
                onChange={onSliderChange}
                onKeyDown={onInputKey}
            />
            <input className="w-8 bg-purple-100 focus:bg-white text-[.6rem] tm-focus-ring ring-offset-purple-100 rounded-sm"
                value={local}
                onChange={onInputChange}
                onKeyDown={onInputKey}
            />
        </div>
    );
}

export function SmallSlider({ label, min, max, step = .01, labelWidth = '4.5rem', value, onChange }: SliderProps) {
    const [local, onSliderChange, onInputChange, onInputKey] = useFloatInput(value, { min, max, step }, onChange); // TODO: what to do with NaN?
    return (
        <div className="px-2 w-full h-4 text-[.6rem] flex-centered space-x-2 text-purple-900">
            <div className="flex-none" style={{ width: labelWidth }}>{label}</div>
            <input
                className="ui-slider"
                type="range"
                min={min} max={max} step={step}
                value={value}
                tabIndex={-1}
                onChange={onSliderChange}
                onKeyDown={onInputKey}
            />
            <input className="w-8 bg-purple-100 focus:bg-white text-[.6rem] tm-focus-ring ring-offset-purple-100 rounded-sm"
                value={local}
                onChange={onInputChange}
                onKeyDown={onInputKey}
            />
        </div>
    );
}
