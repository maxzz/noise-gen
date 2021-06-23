import React from 'react';
import { SliderProps } from './Slider';
import './Sliders.scss';
import ChevronHorizontal from './ChevronHorizontal';

function NoiseTypeBox({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void; }) {
    return (
        <div className={`w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex items-center justify-center cursor-pointer
            ${selected ? 'bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400' : ''}`}
            onClick={onClick}
        >{text}</div>

    );
}

function Slider({ label, min, max, step = .01, labelWidth = '4.5rem', value, onChange}: SliderProps) {
    return (
        <div className="px-2 w-full h-4 flex items-center justify-center space-x-2 text-[.6rem] text-purple-900">
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

function NoiseEditor() {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(0);

    function setNoise(value: number) {
        setSelected(value);
    }

    function setScale(value: number) {

    }

    return (
        <div className="relative text-purple-900 border-l border-purple-300 flex flex-col">
            <div
                className={`absolute top-1.5 right-1 p-1 cursor-pointer hover:ring-1 ring-gray-600 rounded-[4px] ${open ? 'scale-[-1]' : ''}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <ChevronHorizontal />
            </div>

            {/* Editor body */}
            {open && <div className="w-36 -mt-2 pt-2 pl-1">
                {/* Noise type */}
                <div className="flex items-center text-xs select-none">
                    <div className="">Noise</div>
                    <div className="pl-2 flex items-center text-[.6rem] space-x-1">
                        <NoiseTypeBox text="2D" selected={selected === 0} onClick={() => setNoise(0)} />
                        <NoiseTypeBox text="3D" selected={selected === 1} onClick={() => setNoise(1)} />
                        <NoiseTypeBox text="4D" selected={selected === 2} onClick={() => setNoise(2)} />
                    </div>
                </div>

                {/* Noise params */}
                <div className="pl-1 mt-1 text-right">
                    <Slider labelWidth="2rem" min={1} max={10} value={2} onChange={setScale} label="scale x" />
                    <Slider labelWidth="2rem" min={1} max={10} value={2} onChange={setScale} label="scale y" />
                    <Slider labelWidth="2rem" min={1} max={10} value={2} onChange={setScale} label="scale z" />
                    <Slider labelWidth="2rem" min={1} max={10} value={2} onChange={setScale} label="scale w" />
                </div>
            </div>}
        </div>
    );
}

export default NoiseEditor;
