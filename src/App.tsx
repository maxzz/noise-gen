import React, { useEffect, useState } from 'react';
import './App.css';
import webWorker from './utils/web-worker?url';

function Canvas() {
    const canvas = React.useRef(null);
    const worker = React.useRef<Worker>();

    useEffect(() => {
        const newWorker = new Worker(webWorker);
        newWorker.onmessage = (event: any) => {
            console.log(event);
        };
        newWorker.onerror = (event: any) => {
            console.log('error', event);
        };
        newWorker.postMessage({init: 'init'});
        worker.current = newWorker;
        return () => {
            worker.current?.terminate();
        }
    }, []);

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
