import React from 'react';
import './App.scss';
import { useAtom } from 'jotai';
import { AppBackgroundActiveAtom, AppBackgroundUrlAtom } from './atoms';
import Logo from './components/Logo';
import Canvas from './components/RenderCanvas';
import PreciseControls from './components/PreciseControls';
import MainControls from './components/MainControls';
import XtraGithubLogo from './components/XtraGithubLogo';

function App() {
    const [appBackgroundUrl, setAppBackgroundUrl] = useAtom(AppBackgroundUrlAtom);
    const [appBackgroundActive] = useAtom(AppBackgroundActiveAtom);
    return (
        <div
            className="App h-screen flex flex-col items-center space-y-4 bg-purple-200"
            // style={{background: `radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`}}
            // style={{backgroundImage: `url(${bkgImage}), radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`, backgroundBlendMode: 'multiply, screen, color-dodge'}}
            style={
                appBackgroundActive ?
                    { backgroundImage: `url(${appBackgroundUrl}), radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`, backgroundBlendMode: 'multiply, screen, color-dodge' }
                    :
                    { backgroundImage: `radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)` }
            }
        >
            {/* Header */}
            <div className="w-full py-2 flex items-center justify-between text-purple-900 bg-purple-300 shadow-sm select-none">
                <div className="mx-4 flex-none flex-centered">
                    <Logo />

                    {/* Clear background */}
                    {appBackgroundActive &&
                        <button
                            className="ml-2 px-2 pb-[1px] text-xs dark-frame-rounded bg-purple-100 uppercase"
                            title="Clear background image"
                            onClick={() => setAppBackgroundUrl(null)}
                        >
                            Clear bkg
                        </button>
                    }
                </div>

                <div className="px-4 py-2 text-xl uppercase">
                    <span>Noise generator: xp10-525N</span>
                </div>
                
                <XtraGithubLogo />
            </div>

            <div className="relative max-w-md w-full flex-1 flex flex-col items-center">
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

export default App;
