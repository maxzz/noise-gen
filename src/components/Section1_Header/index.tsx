import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { AppBackgroundActiveAtom, AppBackgroundUrlAtom } from '../../store';
import { TestCubeAnimation } from '../UI/Icons/TestCubeAnimation';
import { AppLogo } from '../UI/Icons/XtraAppLogo';
import { GithubLogoInline } from '../UI/Icons/XtraGithubLogo';

function ButtonClearAppBg() {
    const setAppBackgroundUrl = useSetAtom(AppBackgroundUrlAtom);
    return (
        <button
            className="ml-2 px-2 pb-[1px] text-xs dark-frame-rounded bg-purple-100 uppercase"
            title="Clear background image (Alt+F2)"
            onClick={() => setAppBackgroundUrl(null)}
        >
            Clear bkg
        </button>
    );
}

export function Section1_Header() {
    const appBackgroundActive = useAtomValue(AppBackgroundActiveAtom);
    return (
        <div className="w-full py-2 flex items-center justify-between text-purple-900 bg-purple-300 select-none" style={{ boxShadow: '#00000033 0 1px 2px' }}>
            <div className="mx-4 flex-none flex-centered">
                <div className="flex items-center space-x-1">
                    <AppLogo />
                    <div className="-ml-1">
                        <TestCubeAnimation
                            initialIso={true}
                            colorFace="var(--purple-900)"
                            colorBorder="var(--purple-200)"
                            colorBg="var(--purple-300)"
                            colorDots="var(--purple-900)"
                        />
                    </div>
                </div>

                {/* Clear background */}
                {appBackgroundActive && <ButtonClearAppBg />}
            </div>

            <div className="px-4 py-2 text-xl uppercase flex items-center">
                <GithubLogoInline href="https://github.com/maxzz/noise-gen" />
                <div className="pl-1 pb-0.5 tracking-tighter" style={{ textShadow: '#a88cff70 3px 2px' }}>
                    Noise generator: xp10-525N
                </div>
            </div>
        </div>
    );
}
