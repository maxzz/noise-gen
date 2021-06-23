import React from 'react';
//import { RadioGroup } from '@headlessui/react';
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
                <div className="flex items-center text-xs select-none">
                    <div className="">Noise</div>
                    <div className="pl-2 flex items-center text-[.6rem] space-x-1">
                        <NoiseTypekBox text="2D" selected={selected === 0} onClick={() => setNoise(0)} />
                        <NoiseTypekBox text="3D" selected={selected === 1} onClick={() => setNoise(1)} />
                        <NoiseTypekBox text="4D" selected={selected === 2} onClick={() => setNoise(2)} />

                        {/* <div className={`w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex items-center justify-center cursor-pointer
                            ${selected === 0 ? 'bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400' : ''}`}
                            onClick={() => setNoise(0)}
                        >2D</div>
                        <div className={`w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex items-center justify-center cursor-pointer
                            ${selected === 1 ? 'bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400' : ''}`}
                            onClick={() => setNoise(1)}
                        >3D</div>
                        <div className={`w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex items-center justify-center cursor-pointer
                            ${selected === 2 ? 'bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400' : ''}`}
                            onClick={() => setNoise(2)}
                        >4D</div> */}
                    </div>
                </div>

                {/* Noise type */}
                {/* <div className="flex items-center mt-2">
                    <div className="text-xs">Noise</div>
                    <RadioGroup value={selected} onChange={setNoise}>
                        <div className="px-2 flex place-content-evenly space-x-1">
                            {noises.map((noise, index) => (
                                <RadioGroup.Option
                                    key={index}
                                    value={index}
                                    className={
                                        ({ active, checked }) => `
                                                ${active ? 'ring-1 ring-offset-1 ring-offset-sky-300 ring-white ring-opacity-60' : ''}
                                                ${checked ? 'bg-sky-900 bg-white' : 'bg-purple-100'}
                                                w-5 h-5 relative text-[.6rem] rounded-[4px] px-1 py-0.5 cursor-pointer flex focus:outline-none
                                                border border-gray-500
                                                `
                                    }
                                >
                                    {noises[index]}
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div> */}
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
