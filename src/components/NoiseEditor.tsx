import React from 'react';
import { SliderProps } from './Slider';
import './Sliders.scss';
import { atom, useAtom } from 'jotai';
import { NoiseAtom, SetNoiseScaleAtom, SetNoiseTypeAtom, ShowNoiseEditorAtom } from '../atoms';
import useFloatInput from '../hooks/useFloatInput';

function NoiseTypeBox({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void; }) {
    return (
        <div className={`w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex items-center justify-center cursor-pointer
            ${selected ? 'bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400' : ''}`}
            onClick={onClick}
        >{text}</div>

    );
}

function Slider({ label, min, max, step = .01, labelWidth = '4.5rem', value, onChange }: SliderProps) {
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

function NoiseEditor() {
    const [showNoiseEditor] = useAtom(ShowNoiseEditorAtom);
    const [noise] = useAtom(NoiseAtom);
    const [, setNoiseType] = useAtom(SetNoiseTypeAtom);
    const [, setNoiseScale] = useAtom(SetNoiseScaleAtom);

    const [local, setLocal] = React.useState({
        x: noise.x,
        y: noise.y,
        z: noise.z,
        w: noise.w,
    });

    function setNoise(value: number) {
        setNoiseType(value);
    }

    function setScale(axis: string, value: number) {
        setNoiseScale({ axis, value });
    }

    return (
        <div className="relative text-purple-900 border-l border-purple-300 flex flex-col">
            {/* Editor body */}
            {showNoiseEditor && <div className="w-36 -mt-2 pt-2 pl-1">
                {/* Noise type */}
                <div className="flex items-center text-xs select-none">
                    <div className="">Noise</div>
                    <div className="pl-2 flex items-center text-[.6rem] space-x-1">
                        <NoiseTypeBox text="2D" selected={noise.dim === 2} onClick={() => setNoise(2)} />
                        <NoiseTypeBox text="3D" selected={noise.dim === 3} onClick={() => setNoise(3)} />
                        <NoiseTypeBox text="4D" selected={noise.dim === 4} onClick={() => setNoise(4)} />
                    </div>
                </div>

                {/* Noise params */}
                {/* <div className="pl-1 mt-1 text-right">
                    <Slider labelWidth="2rem" min={.01} max={10} value={local.x} onChange={(value) => setScale('x', value)} label="scale x" />
                    <Slider labelWidth="2rem" min={.01} max={10} value={local.y} onChange={(value) => setScale('y', value)} label="scale y" />
                    {noise.dim > 2 && <Slider labelWidth="2rem" min={.01} max={10} value={local.z} onChange={(value) => setScale('z', value)} label="scale z" />}
                    {noise.dim > 3 && <Slider labelWidth="2rem" min={.01} max={10} value={local.w} onChange={(value) => setScale('w', value)} label="scale w" />}
                </div> */}
                <div className="pl-1 mt-1 text-right">
                    <Slider labelWidth="2rem" min={.01} max={10} value={noise.x} onChange={(value) => setScale('x', value)} label="scale x" />
                    <Slider labelWidth="2rem" min={.01} max={10} value={noise.y} onChange={(value) => setScale('y', value)} label="scale y" />
                    {noise.dim > 2 && <Slider labelWidth="2rem" min={.01} max={10} value={noise.z} onChange={(value) => setScale('z', value)} label="scale z" />}
                    {noise.dim > 3 && <Slider labelWidth="2rem" min={.01} max={10} value={noise.w} onChange={(value) => setScale('w', value)} label="scale w" />}
                </div>
            </div>}
        </div>
    );
}

export default NoiseEditor;
