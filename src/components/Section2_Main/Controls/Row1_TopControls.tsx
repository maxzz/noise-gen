import React, { HTMLAttributes } from 'react';
import { Atom, PrimitiveAtom, useAtom, useSetAtom, WritableAtom } from 'jotai';
import { GeneratePresetAtom, RandomSeedAtom, SeedAtom, ShowNoiseEditorAtom } from '@/store';
import { ButtonChooseColorBg } from './Buttons/ButtonChooseColorBg';
import { ButtonChooseColor } from './Buttons/ButtonChooseColor';
import { classNames } from '@/utils';
import { IconCosine } from '@/components/UI/Icons';

function Button({ className, children, setAtom, onClick, ...rest }: {setAtom: WritableAtom<null, unknown> | WritableAtom<null, boolean>} &  HTMLAttributes<HTMLButtonElement>) {
    const set = useSetAtom(setAtom);
    return (
        <button
            className={classNames(
                "dark-frame-rounded text-gray-100 top-row-button-gradient active-scale no-active-ouline select-none", className,
            )}
            onClick={onClick || set}
            {...rest}
        >
            {children}
        </button>
    );
}

export function Row1_TopControls() {
    const [seed, setSeed] = useAtom(SeedAtom);
    const setRansomSeed = useSetAtom(RandomSeedAtom);
    const generatePreset = useSetAtom(GeneratePresetAtom);
    const setShowNoiseEditor = useSetAtom(ShowNoiseEditorAtom);

    return (
        <div className="h-8 flex space-x-1 text-sm">
            <input
                className="flex-1 w-full px-2 py-1 text-xs text-purple-900 bg-purple-100 dark-frame-rounded"
                placeholder="Type anything as a seed"
                value={seed} onChange={(event) => setSeed(event.target.value)}
            />

            <Button className="h-8 px-3 pb-0.5 uppercase" title="Generate random seed" setAtom={RandomSeedAtom}>
                Random Seed
            </Button>

            <Button className="h-8 px-3 pb-0.5 uppercase" title="Generate a random preset" setAtom={GeneratePresetAtom}>
                Preset
            </Button>

            <Button className="w-8 h-8" title="Show/Hide noise parameters" setAtom={ShowNoiseEditorAtom} onClick={() => setShowNoiseEditor(prev => !prev)}>
                <IconCosine />
            </Button>

            <ButtonChooseColor className="w-8 h-8 top-row-button-gradient" />
            <ButtonChooseColorBg />
        </div>
    );
}
