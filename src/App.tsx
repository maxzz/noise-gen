import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import './App.css';
import webWorker from './utils/web-worker?url';
import { offscreenCanvasAtom } from './atoms';

function Canvas() {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = React.useRef<Worker>();

    const [offscreenCanvasCashed, offscreenCanvasCashedSet] = useAtom(offscreenCanvasAtom);

    useEffect(() => {
        if (!canvas.current) {
            return;
        }
        console.log('use on', canvas.current, 'offscreen', offscreenCanvasCashed);
        
        canvas.current.dataset.tm = '444';

        const offscreen = offscreenCanvasCashed || canvas.current.transferControlToOffscreen();

        if (!offscreenCanvasCashed) {
            offscreenCanvasCashedSet(offscreen);
        }

        const newWorker = new Worker(webWorker);

        newWorker.onmessage = (event: any) => {
            console.log(event);
        };
        newWorker.onerror = (event: any) => {
            console.log('error', event);
        };
        newWorker.postMessage({
            init: 'init',
            canvas: offscreen,
        }, [offscreen]);

        worker.current = newWorker;
        return () => {
            console.log('use off', canvas.current);

            worker.current?.terminate();
            worker.current = undefined;
        }
    }, [canvas]);

    return (
        <canvas ref={canvas}></canvas>
    )
}

function App() {
    return (
        <div className="App">
            <button className="text-red-600">AAA</button>
            <Canvas />
        </div>
    );
}

export default App;
