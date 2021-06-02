import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { colorAtom, seedAtom } from './atoms';
import './App.css';
import Logo from './components/Logo';
import { HexColorPicker } from "react-colorful";
import { useDebounce, useHoverDirty, useMeasure } from 'react-use';
import DragZone from './components/DragZone';
import useCanvasWorker from './hooks/useCanvasWorker';

function Canvas({ seed, color }: { seed: string, color: string; }) {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = useCanvasWorker(canvas);
    const [measureRef, { width: widthRow, height: heightRow }] = useMeasure<HTMLDivElement>();

    const containerRef = useRef<HTMLDivElement>(null);
    const isHovered = useHoverDirty(containerRef);
    const [dragActive, setDragActive] = useState(false);

    const [sizeDebounced, sizeDebouncedSet] = useState<{ width: number, height: number; }>({ width: 0, height: 0 });
    const [colorDebounced, colorDebouncedSet] = useState<string>(color);

    useEffect(() => {
        worker.current?.postMessage({ type: 're-run', seed, color: colorDebounced, width: sizeDebounced.width, height: sizeDebounced.height });
    }, [seed, colorDebounced, sizeDebounced]);

    useDebounce(() => {
        colorDebouncedSet(color);
    }, 100, [color]);

    useDebounce(() => {
        sizeDebouncedSet({ width: widthRow, height: heightRow });
    }, 100, [widthRow, heightRow]);

    const [manualSize, manualSizeSet] = useState<{ w: number; h: number; }>({ w: 300, h: 300 });
    useEffect(() => {
        widthRow && heightRow && manualSizeSet({ w: widthRow, h: heightRow });
    }, [widthRow, heightRow]);

    return (
        <div className={`relative ${isHovered ? 'border-2 border-red-600' : 'border-2 border-green-600'}`} ref={containerRef}>
            <div 
                className="w-full h-full overflow-hidden"
                style={{ resize: 'both', width: `${manualSize.w}px`, height: `${manualSize.h}px` }}
                ref={measureRef}
            >
                <canvas ref={canvas} className="w-full h-full"></canvas>
            </div>
            <DragZone 
                className="absolute w-5 h-5 rounded-full border-2 -bottom-2 -right-2 z-10 
                    bg-green-500 border-green-700 active:border-green-600
                    transform active:scale-0"
                size={manualSize} setSize={manualSizeSet} onActivated={(active) => {
                    setDragActive(active);
                }}
            />
            {dragActive && <div className="absolute text-[.6rem] text-gray-700">{widthRow} x {heightRow}</div>}
        </div>
    );
}

function ColorPicker(props: { className: string, style?: React.CSSProperties; }) {
    const { className, style = {} } = props;
    const [color, colorSet] = useAtom(colorAtom);
    const [isDown, isDownSet] = useState<boolean>(false);
    return (
        <div
            className={`${className} relative p-1 border rounded border-gray-400 bg-purple-100 transform active:scale-95`}
            style={{ ...style }}
            onClick={() => isDownSet(v => !v)}
        >
            <div className="w-full h-full rounded" style={{ backgroundColor: color }}></div>
            <div className={`absolute right-0 top-full z-10 shadow border rounded-[0.6rem] border-gray-700 ${isDown ? '' : 'hidden'}`}>
                <HexColorPicker color={color} onChange={colorSet} />
            </div>
        </div>
    );
}

function App() {
    const [seed, seedSet] = useAtom(seedAtom);
    const [color] = useAtom(colorAtom);

    function doRandom() {
        seedSet(`${Math.random()}`.replace(/^0\./, ''));
    }
    return (
        <div className="App h-screen flex flex-col items-center space-y-4 bg-gray-100">
            <div className="w-full py-2 flex items-center justify-between text-purple-900 bg-purple-300">
                <div className="mx-4 flex-none w-10 h-10"><Logo /></div>
                <div className="px-4 py-2 text-xl uppercase">Noise generator: xp10-525N</div>
            </div>

            {/* <div className="max-w-lg m-auto space-y-4"> */}
            <div className="max-w-md w-full flex-1 flex flex-col items-center space-y-4">

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
                <div className="flex-1 flex items-center">
                    <div className="bg-red-100">
                        {/* <div className="w-96 h-96 bg-red-100 overflow-hidden" style={{ resize: 'both' }}> */}
                        <Canvas seed={seed} color={color} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
