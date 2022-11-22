import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useSpring, a } from '@react-spring/web';
import { SmallSlider } from '@/components/UI/Slider';
import { NoiseAtom, ResetNoiseToDefaultAtom, SetNoiseScaleAtom, SetNoiseTypeAtom, ShowNoiseEditorAtom } from '@/store';
import { AxisKey, NoiseParams, NOISEPARAMS } from '@/store/types';
import { classNames } from '@/utils';

function NoiseSelectorButton({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void; }) {
    return (
        <div
            className={classNames(
                "w-5 h-5 px-1 py-0.5 border border-purple-400 rounded flex-centered cursor-pointer",
                selected && "bg-white ring-1 ring-offset-1 ring-offset-red-100 ring-purple-400",
            )}
            onClick={onClick}
        >{text}</div>
    );
}

function NoiseSelector() {
    const { dim } = useAtomValue(NoiseAtom);
    const setNoiseType = useSetAtom(SetNoiseTypeAtom);
    return (
        <div className="pl-2 flex items-center text-[.6rem] space-x-1">
            <NoiseSelectorButton text="2D" selected={dim === 2} onClick={() => setNoiseType(2)} />
            <NoiseSelectorButton text="3D" selected={dim === 3} onClick={() => setNoiseType(3)} />
            <NoiseSelectorButton text="4D" selected={dim === 4} onClick={() => setNoiseType(4)} />
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

function MiniSlider({ noise, axis }: { noise: NoiseParams; axis: AxisKey; }) {
    const setNoiseScale = useSetAtom(SetNoiseScaleAtom);
    function setScale(axis: AxisKey, value: number) {
        setNoiseScale({ axis, value });
    }
    const { min, max } = NOISEPARAMS.d3;
    return (
        <SmallSlider labelWidth="2rem" min={min[axis]} max={max[axis]} value={noise[axis]} onChange={(value) => setScale(axis, value)} label={`scale ${axis}`} />
    );
}

function NoiseParamSliders() {
    const noise = useAtomValue(NoiseAtom);
    return (
        <div className="pl-1 mt-1 text-right">
            {noise.dim >= 2 && <MiniSlider noise={noise} axis={'x'} />}
            {noise.dim >= 2 && <MiniSlider noise={noise} axis={'y'} />}
            {noise.dim >= 2 && <MiniSlider noise={noise} axis={'z'} />}
            {noise.dim >= 2 && <MiniSlider noise={noise} axis={'w'} />}
        </div>
    );
}

export function Row2_NoiseEditor() {
    const showNoiseEditor = useAtomValue(ShowNoiseEditorAtom);

    const [showResetNoise, setShowResetNoise] = React.useState(false);

    const springStyles = useSpring({
        opacity: showNoiseEditor ? 1 : 0,
        width: showNoiseEditor ? 144 : 0,
        transform: showNoiseEditor ? 'scale(1)' : 'scale(0)',
        config: {
            duration: 200,
        }
    });

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
                                    onClick={() => setShowResetNoise(v => !v)}
                                >
                                    Noise
                                </div>
                                {showResetNoise && <ButtonResetNoise onClicked={setShowResetNoise} />}
                            </div>

                            <NoiseSelector />
                        </div>

                        <NoiseParamSliders />
                    </div>
                }
            </a.div>
        </div>
    );
}
