import React, { useState } from 'react';
import './App.css';
import webWorker from './utils/web-worker?url';

const worker = new Worker(webWorker);

function App() {
    return (
        <div className="App">
            <button className="text-red-600">AAA</button>
        </div>
    );
}

export default App;
