import React from 'react';
import { useAtom } from 'jotai';
import { AppBackgroundActiveAtom, AppBackgroundUrlAtom } from './store';
import AppLogo from './components/XtraAppLogo';
import Canvas from './components/RenderCanvas';
import PreciseControls from './components/PreciseControls';
import MainControls from './components/MainControls';
import { GithubLogoInline } from './components/XtraGithubLogo';
//import SortedList from './components/UI/DraggableList/TestSortedList';
import TestCubeAnimation from './components/TestCubeAnimation';
import './App.scss';

export function App() {
    const [appBackgroundUrl, setAppBackgroundUrl] = useAtom(AppBackgroundUrlAtom);
    const [appBackgroundActive] = useAtom(AppBackgroundActiveAtom);
    return (
        <div
            className="App h-screen flex flex-col items-center space-y-4 bg-purple-200 color-vars"
            // style={{background: `radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`}}
            // style={{backgroundImage: `url(${bkgImage}), radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`, backgroundBlendMode: 'multiply, screen, color-dodge'}}
            style={
                appBackgroundActive
                    ? {
                        backgroundImage: `url(${appBackgroundUrl}), radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`,
                        backgroundBlendMode: 'multiply, screen, color-dodge',
                    } : {
                        backgroundImage: `radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`,
                    }
            }
        >
            {/* Header */}
            <div className="w-full py-2 flex items-center justify-between text-purple-900 bg-purple-300 select-none" style={{ boxShadow: '#00000033 0 1px 2px' }}>
                <div className="mx-4 flex-none flex-centered">
                    <div className="flex items-center">
                        <AppLogo />
                        <div className="-ml-1">
                            <TestCubeAnimation initialIso={true} colorFace="var(--purple-900)" colorBorder="var(--purple-200)" colorBg="var(--purple-300)" colorDots="var(--purple-900)" />
                        </div>
                    </div>

                    {/* Clear background */}
                    {appBackgroundActive &&
                        <button
                            className="ml-2 px-2 pb-[1px] text-xs dark-frame-rounded bg-purple-100 uppercase"
                            title="Clear background image (Alt+F2)"
                            onClick={() => setAppBackgroundUrl(null)}
                        >
                            Clear bkg
                        </button>
                    }
                </div>

                <div className="px-4 py-2 text-xl uppercase flex items-center">
                    <GithubLogoInline href="https://github.com/maxzz/noise-gen" />
                    <div className="pl-1 pb-0.5" style={{ textShadow: '#a88cff70 3px 2px' }}>
                        Noise generator: xp10-525N
                    </div>
                </div>
            </div>

            <div className="relative max-w-md w-full flex-1 flex flex-col items-center">
                {/* <div className="">
                    <SortedList />
                </div> */}

                {/* Controls */}
                <div className="w-full flex flex-col space-y-1">
                    <MainControls />
                    <PreciseControls />
                </div>

                {/* Canvas */}
                <div className="flex-1 mt-1">
                    <Canvas />
                </div>
            </div>
        </div>
    );
}
