import React from 'react';
import './App.scss';
import { useAtom } from 'jotai';
import { colorAtom, DistortionAtom, DotDiameterAtom, N1Atom, N2Atom, seedAtom } from './atoms';
import Logo from './components/Logo';
import ColorPicker from './components/ColorPicker';
import Canvas from './components/RenderCanvas';

function App() {
    const [seed, setSeed] = useAtom(seedAtom);
    const [color] = useAtom(colorAtom);
    const [n1, setN1] = useAtom(N1Atom);
    const [n2, setN2] = useAtom(N2Atom);
    const [distortion, setDistortion] = useAtom(DistortionAtom);
    const [dotDiameter, setDotDiameter] = useAtom(DotDiameterAtom);

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
                            value={seed} onChange={(event) => setSeed(event.target.value)}
                        />
                        <ColorPicker className="w-12 h-10" />
                    </div>

                    <div className="">
                    {/* <div className="flex flex-col items-center"> */}
                        <input type="range" value={n1} onChange={(event) => setN1(+event.target.value)}/>
                        <input type="range" value={n2} onChange={(event) => setN2(+event.target.value)}/>
                        <input type="range" value={distortion} onChange={(event) => setDistortion(+event.target.value)}/>
                        <input type="range" value={dotDiameter} onChange={(event) => setDotDiameter(+event.target.value)}/>
                    </div>
                    
                    <button
                        className="px-2 py-1 self-center border rounded text-gray-300 bg-gray-600 uppercase transform active:scale-95"
                        onClick={() => setSeed(`${Math.random()}`.replace(/^0\./, ''))}
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
