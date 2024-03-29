import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { AppBackgroundActiveAtom, AppBackgroundUrlAtom } from '@/store';
import { GithubLink } from '@/components/UI/Icons/GithubLink';
import { GameOfDice } from '../UI/Icons/GameOfDice';

function ButtonClearAppBg() {
    const appBackgroundActive = useAtomValue(AppBackgroundActiveAtom);
    const setAppBackgroundUrl = useSetAtom(AppBackgroundUrlAtom);
    return (<>
        {appBackgroundActive &&
            <button
                className="ml-2 px-2 py-2 text-xs text-app-100 bg-app-700 hover:text-app-900 hover:bg-app-200 rounded uppercase active:scale-[.97]"
                title="Clear background image (Alt+F2)"
                onClick={() => setAppBackgroundUrl(null)}
            >
                Clear background
            </button>
        }
    </>);
}

const headerStyles = { boxShadow: '#00000033 0 1px 2px' };
const textStyles = { textShadow: '#7e66ca70 3px 2px' };

export function Section1_Header() {
    return (
        <div className="w-full py-2 flex items-center justify-between text-purple-900 bg-app-500 select-none" style={headerStyles}>
            <div className="mx-6 flex-none flex-centered space-x-4">
                <GameOfDice />
                <ButtonClearAppBg />
            </div>

            <div className="px-4 py-2 flex items-center space-x-2">
                <div className="pl-1 pb-0.5 tracking-tighter text-[clamp(0.75rem,2vw,1.4rem)] uppercase" style={textStyles}>
                    Noise generator: xp10-525N
                </div>

                <GithubLink className="text-app-800 border-app-700" href="https://github.com/maxzz/noise-gen" />
            </div>
        </div>
    );
}
