import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { colorAtom, offscreenCanvasAtom, seedAtom } from './atoms';
import webWorker from './utils/web-worker?worker';
import './App.css';
import Logo from './components/Logo';
import { HexColorPicker } from "react-colorful";
import { useDebounce, useMeasure } from 'react-use';

function Canvas({ seed, color }: { seed: string, color: string }) {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = React.useRef<Worker>();
    const [size, sizeSet] = useState<{width: number, height: number}>({width: 0, height: 0});

    const [offscreenCanvasCashed, offscreenCanvasCashedSet] = useAtom(offscreenCanvasAtom);

    const [measureRef, { width: widthRow, height: heightRow }] = useMeasure<HTMLDivElement>();

    useEffect(() => {
        if (!canvas.current) {
            return;
        }
        console.log('use on', canvas.current, 'offscreen', offscreenCanvasCashed);

        canvas.current.dataset.tm = '444';

        //const hasOffscreen = "OffscreenCanvas" in window;
        canvas.current.width = 0;
        canvas.current.height = 0;

        const offscreen = offscreenCanvasCashed || canvas.current.transferControlToOffscreen();

        if (!offscreenCanvasCashed) {
            offscreenCanvasCashedSet(offscreen);
            //console.log('set offset');
        }

        const newWorker = new webWorker();

        newWorker.onmessage = (event: any) => {
            console.log('from worker:', event.data);
        };
        newWorker.onerror = (event: any) => {
            console.log('from worker: error', event.data);
        };
        newWorker.postMessage({ type: 'init', canvas: offscreen, seed, color }, [offscreen]);

        worker.current = newWorker;
        return () => {
            console.log('use off', canvas.current, offscreenCanvasCashed);

            worker.current?.terminate();
            worker.current = undefined;

            offscreenCanvasCashedSet(null);
        };
    }, [canvas]);

    useEffect(() => {
        console.log('render', size);
        worker.current?.postMessage({ type: 're-run', seed, color, width: size.width, height: size.height });
    }, [seed, color, size]);

    useDebounce(() => {
        console.log('debounce', {width: widthRow, height: heightRow});
        
        sizeSet({width: widthRow, height: heightRow});
    }, 2000, [widthRow, heightRow]);

    console.log('wxh', widthRow, heightRow);

    return (
        <div ref={measureRef} className="w-full h-full">
            <canvas ref={canvas} className="w-full h-full"> {/* bg-purple-200 */}
            {/* width="300px" height="300px" */}
            </canvas>
        </div>
    );
}

function ColorPicker(props: {className: string, style?: React.CSSProperties}) {
    const {className, style = {}} = props;
    const [color, colorSet] = useAtom(colorAtom);
    const [isDown, isDownSet] = useState<boolean>(false);
    return (
        <div className={`${className} relative p-1 border rounded border-gray-400 bg-purple-100 transform active:scale-95`} style={{...style}}
            onClick={() => isDownSet(v => !v)}
        >
            <div className="w-full h-full rounded" style={{backgroundColor: color}}></div>
            <div className={`absolute right-0 top-full z-10 shadow border rounded-[0.6rem] border-gray-700 ${isDown ? '' : 'hidden'}`}>
                <HexColorPicker color={color} onChange={colorSet} />
            </div>
        </div>
    )
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
            <div className="w-full flex-1 flex flex-col space-y-4">

                {/* Controls */}
                <div className="flex flex-col space-y-1">
                    <div className="flex space-x-2">
                        <input
                            className="flex-1 w-full px-2 py-2 text-sm text-gray-900 bg-purple-100 border rounded border-gray-400"
                            placeholder="Type anything as a seed"
                            value={seed} onChange={(event) => seedSet(event.target.value)}
                        />
                        <ColorPicker className="w-12 h-10"/>
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
                    <div className="w-96 h-96">
                        <Canvas seed={seed} color={color} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
