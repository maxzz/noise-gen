import React, { useEffect, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';
import './App.css';
import webWorker from './utils/web-worker?worker';
import { offscreenCanvasAtom, seedAtom } from './atoms';
import Logo from './components/Logo';

function Canvas({ seed }: { seed: string; }) {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = React.useRef<Worker>();

    const [offscreenCanvasCashed, offscreenCanvasCashedSet] = useAtom(offscreenCanvasAtom);

    useEffect(() => {
        if (!canvas.current) {
            return;
        }
        console.log('use on', canvas.current, 'offscreen', offscreenCanvasCashed);

        canvas.current.dataset.tm = '444';

        //const hasOffscreen = "OffscreenCanvas" in window;

        const offscreen = offscreenCanvasCashed || canvas.current.transferControlToOffscreen();

        if (!offscreenCanvasCashed) {
            offscreenCanvasCashedSet(offscreen);
            console.log('set offset');
        }

        const newWorker = new webWorker();

        newWorker.onmessage = (event: any) => {
            console.log('from worker:', event.data);
        };
        newWorker.onerror = (event: any) => {
            console.log('from worker: error', event.data);
        };
        newWorker.postMessage({
            type: 'init',
            canvas: offscreen,
        }, [offscreen]);

        worker.current = newWorker;
        return () => {
            console.log('use off', canvas.current, offscreenCanvasCashed);

            worker.current?.terminate();
            worker.current = undefined;

            offscreenCanvasCashedSet(null);
        };
    }, [canvas]);

    useEffect(() => {
        if (!worker.current) {
            return;
        }
        worker.current.postMessage({ type: 're-run', seed });
    }, [seed]);

    // useLayoutEffect(() => {
    //     console.log('use layout on', offscreenCanvasCashed);

    //     return () => {
    //         console.log('use layout off', offscreenCanvasCashed);
    //         offscreenCanvasCashedSet(null);
    //     };
    // }, [canvas]);

    return (
        <canvas ref={canvas} className="w-full h-full bg-purple-200">

        </canvas>
    );
}

function App() {
    const [seed, seedSet] = useAtom(seedAtom);

    function doRandom() {

    }
    return (
        <div className="App h-screen flex flex-col items-center space-y-4 max-w-lg m-auto bg-gray-100">
            <div className="w-full py-2 flex items-center justify-between bg-purple-300">
                <div className="mx-4 flex-none w-10 h-10 text-red-900"><Logo /></div>
                <div className="px-4 py-2 text-xl uppercase">Noise generator</div>
            </div>

            <div className="w-full flex flex-col space-x-2">
                <input
                    className="flex-1 w-full px-2 py-2 text-sm text-red-900 bg-purple-100 border rounded"
                    placeholder="Type anything as a seed"
                    value={seed} onChange={(event) => seedSet(event.target.value)}
                />
                <button
                    className="px-2 py-1 border rounded text-red-600 uppercase"
                    onClick={() => doRandom()}
                >
                    Random
                </button>
            </div>

            <div className="flex-1 flex items-center">
                <div className="w-96 h-96">
                    <Canvas seed={seed} />
                </div>
            </div>
        </div>
    );
}

export default App;
