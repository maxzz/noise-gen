import React from 'react';
import Slider from './Slider';
import ChevronHorizontal from './ChevronHorizontal';

const noises = ['2D', '3D', '4D'];

function NoiseTypekBox({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void; }) {
    return (
        <div className={`w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex items-center justify-center cursor-pointer
            ${selected ? 'bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400' : ''}`}
            onClick={onClick}
        >{text}</div>

    );
}

function NoiseEditor() {
    const [selected, setSelected] = React.useState(0);

    function setNoise(value: number) {
        setSelected(value);
    }

    function setScale(value: number) {

    }

    return (
        <div className="w-36 -mt-2 pt-2 pl-1 relative text-purple-900 border-l border-purple-300 flex flex-col">
            <div className="absolute top-1.5 right-1 p-1 cursor-pointer hover:ring-1 ring-gray-600 rounded-[4px] scale-[1]">
                <ChevronHorizontal />
            </div>

            {/* Editor body */}
            <div className="">
                {/* Noise type */}
                <div className="flex items-center text-xs select-none">
                    <div className="">Noise</div>
                    <div className="pl-2 flex items-center text-[.6rem] space-x-1">
                        <NoiseTypekBox text="2D" selected={selected === 0} onClick={() => setNoise(0)} />
                        <NoiseTypekBox text="3D" selected={selected === 1} onClick={() => setNoise(1)} />
                        <NoiseTypekBox text="4D" selected={selected === 2} onClick={() => setNoise(2)} />
                    </div>
                </div>

                {/* Noise params */}
                <div className="pl-1 text-right">
                    <Slider labelWidth="2rem" min={1} max={10} value={2} onChange={setScale} label="x" />
                    <Slider labelWidth="2rem" min={1} max={10} value={2} onChange={setScale} label="y" />
                    <Slider labelWidth="2rem" min={1} max={10} value={2} onChange={setScale} label="z" />
                    <Slider labelWidth="2rem" min={1} max={10} value={2} onChange={setScale} label="w" />
                </div>
            </div>
        </div>
    );
}

export default NoiseEditor;
