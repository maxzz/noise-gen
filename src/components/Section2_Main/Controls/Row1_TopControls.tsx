import React from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { GeneratePresetAtom, RandomSeedAtom, SeedAtom } from '@/store';
import { ButtonShowNoise } from '@/components/Section2_Main/Controls/Buttons/ButtonShowNoise';
import { ButtonChooseColorBg } from './Buttons/ButtonChooseColorBg';
import { ButtonChooseColor } from './Buttons/ButtonChooseColor';

export function Row1_TopControls() {
    const [seed, setSeed] = useAtom(SeedAtom);
    const setRansomSeed = useSetAtom(RandomSeedAtom);
    const generatePreset = useSetAtom(GeneratePresetAtom);

    return (
        <div className="h-8 flex space-x-1">
            <input
                className="flex-1 w-full px-2 py-1 text-xs text-purple-900 bg-purple-100 dark-frame-rounded"
                placeholder="Type anything as a seed"
                value={seed} onChange={(event) => setSeed(event.target.value)}
            />

            <button
                className="h-8 px-3 pb-0.5 text-sm
                dark-frame-rounded text-gray-100 
                uppercase transform active-scale
                select-none no-active-ouline top-row-button-gradient"

                title="Generate random seed"
                onClick={setRansomSeed}
            >
                Random Seed
            </button>

            <button
                className="h-8 px-3 pb-0.5 text-sm
                dark-frame-rounded text-gray-100
                uppercase transform active-scale
                select-none no-active-ouline top-row-button-gradient"
                title="Generate a random preset"
                onClick={generatePreset}
            >
                Preset
            </button>

            <div className="w-8 h-8 flex-none">
                <ButtonShowNoise />
            </div>

            <ButtonChooseColor className="w-8 h-8 top-row-button-gradient" />
            <ButtonChooseColorBg />
        </div>
    );
}
