import React from 'react';
import { RadioGroup } from '@headlessui/react';
import Slider from './Slider';
import ChevronHorizontal from './ChevronHorizontal';

const noises = ['2D', '3D', '4D'];

function NoiseEditor() {
    const [selected, setSelected] = React.useState(0);

    function setNoise(value: number) {
        setSelected(value);
    }

    function setScale(value: number) {

    }

    return (
        <div className="w-36 -mt-2 pt-2 flex flex-col">
            {/* Noise type */}
            <div className="relative flex items-center">

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

                <div className="absolute -top-0.5 right-1 p-1 cursor-pointer hover:ring-1 ring-gray-600 rounded-[4px] scale-[1]">
                    <ChevronHorizontal />
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
    );
}

export default NoiseEditor;
