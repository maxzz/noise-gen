import React, { RefObject, useEffect } from 'react';
import { useAtom } from 'jotai';
import { offscreenCanvasAtom } from '../atoms';
import webWorker from './utils/web-worker?worker';

export default function useCanvasworker(canvas: RefObject<HTMLCanvasElement>) {

    const worker = React.useRef<Worker>();
    const [offscreenCanvasCashed, offscreenCanvasCashedSet] = useAtom(offscreenCanvasAtom);

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
            offscreenCanvasCashedSet(offscreen);
        }

        const newWorker = new webWorker();

        newWorker.onmessage = (event: any) => {
            console.log('from worker:', event.data);
        };
        newWorker.onerror = (event: any) => {
            console.log('from worker: error', event.data);
        };
    // newWorker.postMessage({ type: 'init', canvas: offscreen, seed, color: colorDebounced }, [offscreen]);

        worker.current = newWorker;
        return () => {
            console.log('use off', canvas.current, offscreenCanvasCashed);

            worker.current?.terminate();
            worker.current = undefined;

            offscreenCanvasCashedSet(null);
        };
    }, [canvas]);

    return worker;
}
