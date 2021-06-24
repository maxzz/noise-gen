import React from 'react';
import { useAtom } from 'jotai';
import { NoiseAtom, SetNoiseScaleAtom, SetNoiseTypeAtom, ShowNoiseEditorAtom } from '../atoms';
import { SmallSlider } from './Slider';

function NoiseTypeBox({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void; }) {
    return (
        <div
            className={
                `w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex items-center justify-center cursor-pointer
                ${selected ? 'bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400' : ''}`
            }
            onClick={onClick}
        >{text}</div>
    );
}

function NoiseEditor() {
    const [showNoiseEditor] = useAtom(ShowNoiseEditorAtom);
    const [noise] = useAtom(NoiseAtom);
    const [, setNoiseType] = useAtom(SetNoiseTypeAtom);
    const [, setNoiseScale] = useAtom(SetNoiseScaleAtom);

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
                <div className="pl-1 mt-1 text-right">
                    <SmallSlider labelWidth="2rem" min={.01} max={10} value={noise.x} onChange={(value) => setScale('x', value)} label="scale x" />
                    <SmallSlider labelWidth="2rem" min={.01} max={10} value={noise.y} onChange={(value) => setScale('y', value)} label="scale y" />
                    {noise.dim > 2 && <SmallSlider labelWidth="2rem" min={.01} max={10} value={noise.z} onChange={(value) => setScale('z', value)} label="scale z" />}
                    {noise.dim > 3 && <SmallSlider labelWidth="2rem" min={.01} max={10} value={noise.w} onChange={(value) => setScale('w', value)} label="scale w" />}
                </div>
            </div>}
        </div>
    );
}

export default NoiseEditor;
