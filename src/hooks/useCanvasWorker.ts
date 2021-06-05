import React, { RefObject, useEffect } from 'react';
import { useAtom } from 'jotai';
import { OffscreenCanvasAtom, RenderWorkerAtom } from '../atoms';
import webWorker from '../utils/web-worker?worker';
import { I2W } from '../utils/types';

export default function useCanvasWorker(canvas: RefObject<HTMLCanvasElement>): Worker | null {

    const [worker, setWorker] = useAtom(RenderWorkerAtom);
    const [offscreenCanvasCashed, setOffscreenCanvasCashed] = useAtom(OffscreenCanvasAtom);

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

        // newWorker.onmessage = (event: any) => {
        //     console.log('From worker:', event.data);
        // };
        // newWorker.onerror = (event: any) => {
        //     console.log('From worker: Error:', event.data);
        // };

        setWorker(newWorker);
        
        newWorker.postMessage({ type: 'init', canvas: offscreen } as I2W.Init, [offscreen]);

        return () => {
            console.log('use off', canvas.current, offscreenCanvasCashed);

            worker?.terminate();
            setWorker(null);
            setOffscreenCanvasCashed(null);
        };
    }, [canvas]);

    return worker;
}
