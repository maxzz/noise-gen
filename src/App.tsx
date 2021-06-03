import React from 'react';
import { useAtom } from 'jotai';
import { colorAtom, seedAtom } from './atoms';
import './App.css';
import Logo from './components/Logo';
import ColorPicker from './components/ColorPicker';
import Canvas from './components/RenderCanvas';

function App() {
    const [seed, seedSet] = useAtom(seedAtom);
    const [color] = useAtom(colorAtom);

    function doRandom() {
        seedSet(`${Math.random()}`.replace(/^0\./, ''));
    }
    return (
        <div className="App h-screen flex flex-col items-center space-y-4 bg-gray-100">
            {/* Header */}
            <div className="w-full py-2 flex items-center justify-between text-purple-900 bg-purple-300">
                <div className="mx-4 flex-none w-10 h-10"><Logo /></div>
                <div className="px-4 py-2 text-xl uppercase">Noise generator: xp10-525N</div>
            </div>

            <div className="max-w-md w-full flex-1 flex flex-col items-center">

                {/* Controls */}
                <div className="w-full flex flex-col space-y-1">
                    <div className="flex space-x-2">
                        <input
                            className="flex-1 w-full px-2 py-2 text-sm text-gray-900 bg-purple-100 border rounded border-gray-400"
                            placeholder="Type anything as a seed"
                            value={seed} onChange={(event) => seedSet(event.target.value)}
                        />
                        <ColorPicker className="w-12 h-10" />
                    </div>
                    <button
                        className="px-2 py-1 self-center border rounded text-gray-300 bg-gray-600 uppercase transform active:scale-95"
                        onClick={() => doRandom()}
                    >
                        Random
                    </button>
                </div>

                {/* Canvas */}
                <div className="flex-1 flex items-center mt-1">
                    <Canvas seed={seed} color={color} />
                </div>
            </div>
        </div>
    );
}

export default App;
