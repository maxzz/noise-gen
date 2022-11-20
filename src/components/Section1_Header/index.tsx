import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { AppBackgroundActiveAtom, AppBackgroundUrlAtom } from '@/store';
import { Cube } from '@/components/UI/Icons/Cube';
import { TwoCubes } from '@/components/UI/Icons/TwoCubes';
import { GithubLink } from '@/components/UI/Icons/GithubLink';

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

const cubeProps = {
    initialIso: true,
    colorFace: "var(--purple-900)",
    colorBorder: "var(--purple-200)",
    colorBg: "var(--purple-300)",
    colorDots: "var(--purple-900)",
};

export function Section1_Header() {
    return (
        <div className="w-full py-2 flex items-center justify-between text-purple-900 bg-app-500 select-none" style={{ boxShadow: '#00000033 0 1px 2px' }}>
            <div className="mx-4 flex-none flex-centered space-x-4">
                <div className="flex items-center space-x-2">
                    <TwoCubes />
                    {Cube({ cubeProps })}
                </div>

                <ButtonClearAppBg />
            </div>

            <div className="px-4 py-2 text-xl uppercase flex items-center space-x-1">
                <div className="pl-1 pb-0.5 tracking-tighter" style={{ textShadow: '#7e66ca70 3px 2px' }}>
                    Noise generator: xp10-525N
                </div>

                <GithubLink className="text-app-800 border-app-700" href="https://github.com/maxzz/noise-gen" />
            </div>
        </div>
    );
}
