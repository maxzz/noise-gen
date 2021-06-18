import React from 'react';
import './App.scss';
import { useAtom } from 'jotai';
import { AppBackgroundActiveAtom, AppBackgroundUrlAtom, RandomSeedAtom, SeedAtom } from './atoms';
import Logo from './components/Logo';
import ColorPicker from './components/ColorPicker';
import Canvas from './components/RenderCanvas';
import Sliders from './components/Sliders';
import ColorBgPicker from './components/ColorBgPicker';

function App() {
    const [seed, setSeed] = useAtom(SeedAtom);
    const [, setRansomSeed] = useAtom(RandomSeedAtom);
    const [appBackgroundUrl] = useAtom(AppBackgroundUrlAtom);
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
                <div className="mx-4 flex-none w-10 h-10"><Logo /></div>
                <div className="px-4 py-2 text-xl uppercase">Noise generator: xp10-525N</div>
            </div>

            <div className="max-w-md w-full flex-1 flex flex-col items-center">

                {/* Controls */}
                <div className="w-full flex flex-col space-y-1">
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
                            onClick={setRansomSeed}
                        >
                            Random Seed
                        </button>

                        {/* <button
                            className="px-2 py-1 self-center border rounded text-gray-300 bg-gray-600 uppercase transform active:scale-95"
                            onClick={() => setSeed(`${Math.random()}`.replace(/^0\./, ''))}
                        >
                            Random Set
                        </button> */}

                        <ColorPicker className="w-8 h-8" />

                        <ColorBgPicker />
                    </div>

                    <Sliders />
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
