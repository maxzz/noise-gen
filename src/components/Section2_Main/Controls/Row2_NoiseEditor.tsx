import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useSpring, a } from '@react-spring/web';
import { SmallSlider } from '@/components/UI/Slider';
import { NoiseAtom, ResetNoiseToDefaultAtom, SetNoiseScaleAtom, SetNoiseTypeAtom, ShowNoiseEditorAtom } from '@/store';
import { NOISEPARAMS } from '@/store/types';

function NoiseTypeButton({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void; }) {
    return (
        <div
            className={
                `w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex-centered cursor-pointer
                ${selected ? 'bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400' : ''}`
            }
            onClick={onClick}
        >{text}</div>
    );
}

function NoiseSelector() {
    const noise = useAtomValue(NoiseAtom);
    const setNoiseType = useSetAtom(SetNoiseTypeAtom);
    function setNoise(value: number) {
        setNoiseType(value);
    }
    return (
        <div className="pl-2 flex items-center text-[.6rem] space-x-1">
            <NoiseTypeButton text="2D" selected={noise.dim === 2} onClick={() => setNoise(2)} />
            <NoiseTypeButton text="3D" selected={noise.dim === 3} onClick={() => setNoise(3)} />
            <NoiseTypeButton text="4D" selected={noise.dim === 4} onClick={() => setNoise(4)} />
        </div>
    );
}

function ButtonResetNoise({ onClicked }: { onClicked: (v: boolean) => void; }) {
    const resetNoiseToDefault = useSetAtom(ResetNoiseToDefaultAtom);
    function resetNoise() {
        resetNoiseToDefault();
        onClicked(false);
    }
    return (
        <button className="absolute ml-1.5 px-2 py-1 left-full top-1/2 -translate-y-1/2 
        text-white bg-red-500 hover:bg-red-600 tm-focus-ring rounded shadow
        active-scale whitespace-nowrap"
            onClick={resetNoise}
        >
            Reset noise
        </button>
    );
}

export function Row2_NoiseEditor() {
    const showNoiseEditor = useAtomValue(ShowNoiseEditorAtom);
    const noise = useAtomValue(NoiseAtom);
    const setNoiseScale = useSetAtom(SetNoiseScaleAtom);

    const [showResetNoise, setShowResetNoise] = React.useState(false);

    const springStyles = useSpring({
        opacity: showNoiseEditor ? 1 : 0,
        width: showNoiseEditor ? 144 : 0,
        transform: showNoiseEditor ? 'scale(1)' : 'scale(0)',
        config: {
            duration: 200,
        }
    });

    function setScale(axis: string, value: number) {
        setNoiseScale({ axis, value });
    }

    return (
        <div className="relative text-purple-900 flex flex-col">
            {/* Editor body */}
            <a.div className="-mt-2 pt-2 overflow-hidden" style={springStyles}>
                {showNoiseEditor &&
                    <div className="w-36 pl-1">
                        {/* Noise type buttons */}
                        <div className="flex items-center text-xs select-none">

                            {/* Label Noise and Reset noise button */}
                            <div className="relative">
                                <div
                                    className="cursor-pointer hover:text-purple-500"
                                    title="Reset noise to default settings"
                                    onClick={() => setShowResetNoise((prev) => !prev)}
                                >
                                    Noise
                                </div>
                                {showResetNoise && <ButtonResetNoise onClicked={setShowResetNoise} />}
                            </div>

                            <NoiseSelector />
                        </div>

                        {/* Noise params */}
                        <div className="pl-1 mt-1 text-right">
                            {noise.dim >= 2 && <SmallSlider labelWidth="2rem" min={NOISEPARAMS.d3.min.x} max={NOISEPARAMS.d3.max.x} value={noise.x} onChange={(value) => setScale('x', value)} label="scale x" />}
                            {noise.dim >= 2 && <SmallSlider labelWidth="2rem" min={NOISEPARAMS.d3.min.y} max={NOISEPARAMS.d3.max.y} value={noise.y} onChange={(value) => setScale('y', value)} label="scale y" />}
                            {noise.dim >= 3 && <SmallSlider labelWidth="2rem" min={NOISEPARAMS.d3.min.z} max={NOISEPARAMS.d3.max.z} value={noise.z} onChange={(value) => setScale('z', value)} label="scale z" />}
                            {noise.dim >= 4 && <SmallSlider labelWidth="2rem" min={NOISEPARAMS.d3.min.w} max={NOISEPARAMS.d3.max.w} value={noise.w} onChange={(value) => setScale('w', value)} label="scale w" />}
                        </div>
                    </div>
                }
            </a.div>
        </div>
    );
}
