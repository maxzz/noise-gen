import React, { RefObject, useEffect } from 'react';
import { useAtom } from 'jotai';
import { offscreenCanvasAtom } from '../atoms';
import webWorker from '../utils/web-worker?worker';

export default function useCanvasWorker(canvas: RefObject<HTMLCanvasElement>): RefObject<Worker | undefined> {

    const worker = React.useRef<Worker>();
    const [offscreenCanvasCashed, setOffscreenCanvasCashed] = useAtom(offscreenCanvasAtom);

    useEffect(() => {
        if (!canvas.current) {
            return;
        }
        //console.log('use on', canvas.current, 'offscreen', offscreenCanvasCashed);
        //canvas.current.dataset.tm = '444';

        //const hasOffscreen = "OffscreenCanvas" in window;
        canvas.current.width = 0;
        canvas.current.height = 0;

        const offscreen = offscreenCanvasCashed || canvas.current.transferControlToOffscreen();

        if (!offscreenCanvasCashed) {
            setOffscreenCanvasCashed(offscreen);
        }

        const newWorker = new webWorker();

        newWorker.onmessage = (event: any) => {
            console.log('From worker:', event.data);
        };
        newWorker.onerror = (event: any) => {
            console.log('From worker: Error:', event.data);
        };
        
        newWorker.postMessage({ canvas: offscreen }, [offscreen]);

        worker.current = newWorker;
        return () => {
            console.log('use off', canvas.current, offscreenCanvasCashed);

            worker.current?.terminate();
            worker.current = undefined;

            setOffscreenCanvasCashed(null);
        };
    }, [canvas]);

    return worker;
}
