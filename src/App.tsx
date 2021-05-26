import React, { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import webWorker from './utils/web-worker?url';

function Canvas() {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = React.useRef<Worker>();

    useEffect(() => {
        if (!canvas.current) {
            console.log('canvas null');
            
            return;
        }
        console.log('use on', canvas.current, 'tm', canvas.current.dataset.tm);
        
        canvas.current.dataset.tm = '444';

        // const offscreen = canvas.current.transferControlToOffscreen();

        // console.log('use on', canvas.current, canvas.current instanceof OffscreenCanvas);

        // const newWorker = new Worker(webWorker);

        // newWorker.onmessage = (event: any) => {
        //     console.log(event);
        // };
        // newWorker.onerror = (event: any) => {
        //     console.log('error', event);
        // };
        // newWorker.postMessage({
        //     init: 'init',
        //     canvas: offscreen,
        // }, [offscreen]);

        // worker.current = newWorker;
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
