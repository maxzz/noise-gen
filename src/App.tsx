import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { colorAtom, offscreenCanvasAtom, seedAtom } from './atoms';
import webWorker from './utils/web-worker?worker';
import './App.css';
import Logo from './components/Logo';
import { HexColorPicker } from "react-colorful";
import { useDebounce, useMeasure } from 'react-use';

function Canvas({ seed, color }: { seed: string, color: string; }) {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = React.useRef<Worker>();
    const [offscreenCanvasCashed, offscreenCanvasCashedSet] = useAtom(offscreenCanvasAtom);
    const [measureRef, { width: widthRow, height: heightRow }] = useMeasure<HTMLDivElement>();

    const [sizeDebounced, sizeDebouncedSet] = useState<{ width: number, height: number; }>({ width: 0, height: 0 });
    const [colorDebounced, colorDebouncedSet] = useState<string>(color);

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
        newWorker.postMessage({ type: 'init', canvas: offscreen, seed, color: colorDebounced }, [offscreen]);

        worker.current = newWorker;
        return () => {
            console.log('use off', canvas.current, offscreenCanvasCashed);

            worker.current?.terminate();
            worker.current = undefined;

            offscreenCanvasCashedSet(null);
        };
    }, [canvas]);

    useEffect(() => {
        console.log('render', sizeDebounced);
        worker.current?.postMessage({ type: 're-run', seed, color: colorDebounced, width: sizeDebounced.width, height: sizeDebounced.height });
    }, [seed, colorDebounced, sizeDebounced]);

    useDebounce(() => {
        console.log('-------------color', color);
        colorDebouncedSet(color);
    }, 500, [color]);

    useDebounce(() => {
        console.log('debounce', { width: widthRow, height: heightRow });

        sizeDebouncedSet({ width: widthRow, height: heightRow });
    }, 1000, [widthRow, heightRow]);

    console.log('wxh', widthRow, heightRow);




    const [manualSize, manualSizeSet] = useState<{ w: number; h: number; }>({w: 100, h: 100});
    useEffect(() => {
        console.log('manualSize', { width: widthRow, height: heightRow });

        if (widthRow && heightRow) {
            manualSizeSet({w: widthRow, h: heightRow});
        }
    }, [widthRow, heightRow]);
    

    
    const [resizeActive, resizeActiveSet] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const downPt = useRef<{ x: number; y: number; }>();
    const downSz = useRef<{ w: number; h: number; }>();

    useEffect(() => {
        if (resizeActive && containerRef.current) {
            function onMove(ev: MouseEvent) {
                //console.log('mouse', { x: ev.clientX, y: ev.clientY }, 'angle', angle);
                const rot = {
                    x: ev.clientX - downPt.current!.x,
                    y: ev.clientY - downPt.current!.y,
                };
                console.log('ofs: ', { x: rot.x, y: rot.y });
                manualSizeSet((v) => ({w: downSz.current!.w + rot.x, h: downSz.current!.h + rot.y }));
            }
            function onDone() {
                resizeActiveSet(false);
                document.removeEventListener('mouseup', onDone);
            }
            window.addEventListener('mousemove', onMove, false); //TODO: why window and not documnet?
            document.addEventListener('mouseup', onDone, false);
            return () => {
                window.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onDone);
            };
        }
    }, [resizeActive]);


    return (
        <div className="overflow-hidden" style={{ resize: 'both', width: `${manualSize.w}px`, height: `${manualSize.h}px` }}>
            <div ref={measureRef} className="w-full h-full relative">
                <canvas ref={canvas} className="w-full h-full"> {/* bg-purple-200 */}
                </canvas>
                <div
                    ref={containerRef}
                    className="absolute w-4 h-4 rounded-full border-2 border-red-500 -bottom-2 -left-2"
                    style={{cursor: 'nesw-resize'}}
                    onMouseDown={(ev) => {
                        ev.preventDefault();
                        downPt.current = { x: ev.clientX, y: ev.clientY };
                        downSz.current = {w: manualSize.w, h: manualSize.h};
                        resizeActiveSet(true);
                    }}
                    onMouseUp={() => resizeActiveSet(false)}
                >
                </div>
            </div>
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
