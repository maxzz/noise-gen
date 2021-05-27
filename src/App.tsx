import React, { useEffect, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';
import './App.css';
import webWorker from './utils/web-worker?worker';
import { offscreenCanvasAtom } from './atoms';

function Canvas({seed}: {seed: string}) {
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
        }
    }, [canvas]);

    useEffect(() => {
        if (!worker.current) {
            return;
        }
        worker.current.postMessage({type: 're-run', seed});
    }, [seed]);

    // useLayoutEffect(() => {
    //     console.log('use layout on', offscreenCanvasCashed);
        
    //     return () => {
    //         console.log('use layout off', offscreenCanvasCashed);
    //         offscreenCanvasCashedSet(null);
    //     };
    // }, [canvas]);

    return (
        <canvas ref={canvas} className="w-96 h-96 bg-purple-200">

        </canvas>
    )
}

function App() {
    
    function doRun() {
        
    }
    return (
        <div className="App h-screen flex flex-col items-center space-y-4 max-w-lg m-auto">
            <div className="w-full flex justify-between">
                <div className="py-2 px-4 bg-purple-200">logo</div>
                <div className="py-2 px-4 bg-purple-200">menu</div>
            </div>
            <button
                className="px-2 py-1 border rounded text-red-600 uppercase"
                onClick={() => doRun()}
            >
                Run
            </button>
            <div className="flex-1 flex items-center">
                <Canvas seed={'seed'} />
            </div>
        </div>
    );
}

export default App;
