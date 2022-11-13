import React from 'react';
import { useAtom } from 'jotai';
import { GeneratePresetAtom, RandomSeedAtom, SeedAtom } from '../store';
import { ButtonShowNoise } from './UI/ButtonShowNoise';
import { ButtonChooseColorBg } from './UI/ButtonChooseColorBg';
import { ButtonChooseColor } from './UI/ButtonChooseColor';

export function MainControls() {
    const [seed, setSeed] = useAtom(SeedAtom);
    const [, setRansomSeed] = useAtom(RandomSeedAtom);
    const [, generatePreset] = useAtom(GeneratePresetAtom);

    return (
        <div className="h-8 flex space-x-1">
            <input
                className="flex-1 w-full px-2 py-1 text-xs text-purple-900 bg-purple-100 dark-frame-rounded"
                placeholder="Type anything as a seed"
                value={seed} onChange={(event) => setSeed(event.target.value)}
            />

            <button
                className="h-8 px-3 pb-0.5 text-sm
                dark-frame-rounded text-gray-100 bg-purple-400 
                uppercase transform active-scale
                select-none no-active-ouline"
                style={{ background: 'linear-gradient(hsla(0,0%,100%,.5), transparent) rgb(167, 139, 250) border-box' }}
                title="Generate random seed"
                onClick={setRansomSeed}
            >
                Random Seed
            </button>

            <button
                className="h-8 px-3 pb-0.5 text-sm
                dark-frame-rounded text-gray-100 bg-purple-400 
                uppercase transform active-scale
                select-none no-active-ouline"
                style={{ background: 'linear-gradient(hsla(0,0%,100%,.5), transparent) rgb(167, 139, 250) border-box' }}
                title="Generate a random preset"
                onClick={generatePreset}
            >
                Preset
            </button>

            <div className="w-8 h-8 flex-none">
                <ButtonShowNoise />
            </div>
            <ButtonChooseColor className="w-8 h-8" style={{ background: 'linear-gradient(hsla(0,0%,100%,.5), transparent) rgb(167, 139, 250) border-box' }} />
            <div className="">
                <ButtonChooseColorBg />
            </div>
        </div>
    );
}
