import { useAtom } from 'jotai';
import React from 'react';
import { GeneratePresetAtom, RandomSeedAtom, SeedAtom } from '../atoms';
import ColorBgPicker from './ColorBgPicker';
import ColorPicker from './ColorPicker';

function MainControls() {
    const [seed, setSeed] = useAtom(SeedAtom);
    const [, setRansomSeed] = useAtom(RandomSeedAtom);
    const [, generatePreset] = useAtom(GeneratePresetAtom);

    console.log('seed', seed);

    return (
        <div className="flex space-x-1">
            <input
                className="flex-1 w-full px-2 py-1 text-sm text-purple-900 bg-purple-100 border rounded border-gray-400"
                placeholder="Type anything as a seed"
                value={seed} onChange={(event) => setSeed(event.target.value)}
            />

            <button
                className="h-8 px-3 pb-0.5 text-sm
                rounded border border-gray-500 text-gray-100 bg-purple-400
                uppercase transform active:scale-95"
                style={{ background: 'linear-gradient(hsla(0,0%,100%,.5), transparent) rgb(167, 139, 250) border-box' }}
                title="Generate random seed"
                onClick={setRansomSeed}
            >
                Random Seed
            </button>

            <button
                className="h-8 px-3 pb-0.5 text-sm
                rounded border border-gray-500 text-gray-100 bg-purple-400
                uppercase transform active:scale-95"
                style={{ background: 'linear-gradient(hsla(0,0%,100%,.5), transparent) rgb(167, 139, 250) border-box' }}
                title="Generate random preset"
                onClick={generatePreset}
            >
                Preset
            </button>

            <ColorPicker className="w-8 h-8" />
            <ColorBgPicker />
        </div>
    );
}

export default MainControls;