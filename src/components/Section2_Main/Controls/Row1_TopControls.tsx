import React, { HTMLAttributes } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { GeneratePresetAtom, RandomSeedAtom, SeedAtom, ShowNoiseEditorAtom } from '@/store';
import { ButtonChooseColorBg } from './Buttons/ButtonChooseColorBg';
import { ButtonChooseColor } from './Buttons/ButtonChooseColor';
import { classNames } from '@/utils';
import { IconCosine } from '@/components/UI/Icons';

function Button({ className, children, ...rest }: HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={classNames("text-app-100 top-row-button-gradient dark-frame-rounded tm-focus-ring active-scale focus:outline-none select-none", className)}
            {...rest}
        >
            {children}
        </button>
    );
}

function Input({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    const [seed, setSeed] = useAtom(SeedAtom);
    return (
        <input
            className={classNames("px-2 py-1 w-full text-xs text-app-900 bg-purple-100 dark-frame-rounded tm-focus-ring", className)}
            placeholder="Type anything as a seed"
            value={seed} onChange={(event) => setSeed(event.target.value)}
            {...rest}
        />
    );
}

export function Row1_TopControls() {
    const setRansomSeed = useSetAtom(RandomSeedAtom);
    const generatePreset = useSetAtom(GeneratePresetAtom);
    const setShowNoiseEditor = useSetAtom(ShowNoiseEditorAtom);
    return (
        <div className="h-8 flex space-x-1 text-sm">
            <Input className="flex-1" />

            <Button className="h-8 px-3 pb-0.5 uppercase" title="Generate random seed" onClick={setRansomSeed}>
                Random Seed
            </Button>

            <Button className="h-8 px-3 pb-0.5 uppercase" title="Generate a random preset" onClick={generatePreset}>
                Preset
            </Button>

            <Button className="w-8 h-8" title="Show/Hide noise parameters" onClick={() => setShowNoiseEditor(prev => !prev)}>
                <IconCosine />
            </Button>

            <ButtonChooseColor className="w-8 h-8 top-row-button-gradient" />
            <ButtonChooseColorBg />
        </div>
    );
}
