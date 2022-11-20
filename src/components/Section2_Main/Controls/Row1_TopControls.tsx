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
            className={classNames(
                "dark-frame-rounded text-gray-100 top-row-button-gradient active-scale no-active-ouline select-none", className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
}

function ButtonShowNoise() {
    const setShowNoiseEditor = useSetAtom(ShowNoiseEditorAtom);
    return (
        <Button className="w-8 h-8" title="Show/Hide noise parameters" onClick={() => setShowNoiseEditor(prev => !prev)}>
            <IconCosine />
        </Button>
    );
}

// export function ButtonShowNoise() {
//     const setShowNoiseEditor = useSetAtom(ShowNoiseEditorAtom);
//     return (
//         <div
//             className="dark-frame-rounded text-gray-100 top-row-button-gradient active-scale cursor-pointer"
//             title="Show/Hide noise parameters"
//             onClick={() => setShowNoiseEditor(prev => !prev)}
//         >
//             <IconCosine />
//         </div>
//     );
// }

export function Row1_TopControls() {
    const [seed, setSeed] = useAtom(SeedAtom);
    const setRansomSeed = useSetAtom(RandomSeedAtom);
    const generatePreset = useSetAtom(GeneratePresetAtom);

    return (
        <div className="h-8 flex space-x-1 text-sm">
            <input
                className="flex-1 w-full px-2 py-1 text-xs text-purple-900 bg-purple-100 dark-frame-rounded"
                placeholder="Type anything as a seed"
                value={seed} onChange={(event) => setSeed(event.target.value)}
            />

            <Button className="h-8 px-3 pb-0.5 uppercase" title="Generate random seed" onClick={setRansomSeed}>
                Random Seed
            </Button>

            <Button className="h-8 px-3 pb-0.5 uppercase" title="Generate a random preset" onClick={generatePreset}>
                Preset
            </Button>

            <div className="w-8 h-8 flex-none">
                <ButtonShowNoise />
            </div>

            <ButtonChooseColor className="w-8 h-8 top-row-button-gradient" />
            <ButtonChooseColorBg />
        </div>
    );
}
