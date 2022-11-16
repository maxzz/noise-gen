import React, { RefObject, useEffect } from 'react';
import { useAtom } from 'jotai';
import { OffscreenCanvasAtom, RenderWorkerAtom } from '@/store';
import webWorker from '@/utils/render/render-worker?worker';
import { I2W, I4W, WH } from '@/store/types';
import { uuid } from '@/utils';

type PromissedQuery = {
    resolve: (value: any) => void;
};

export interface WorkerEx extends Worker {
    queries: Map<string, PromissedQuery>;
    getImage(size?: { w: number, h: number; }): Promise<any>;
};

export function useCanvasWorker(canvas: RefObject<HTMLCanvasElement>): WorkerEx | null {

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

        const newWorker = new webWorker() as WorkerEx;

        // newWorker.onmessage = (event: any) => {
        //     console.log('From worker:', event.data);
        // };
        // newWorker.onerror = (event: any) => {
        //     console.log('From worker: Error:', event.data);
        // };

        newWorker.queries = new Map();
        newWorker.getImage = (size?: WH) => {
            return new Promise((resolve) => {
                let id = uuid();
                newWorker.queries.set(id, { resolve });
                newWorker.postMessage({
                    type: 'get-image',
                    size,
                    promiseId: id,
                } as I2W.GetImage);
            });
        };

        newWorker.addEventListener('message', (event: I4W.Message) => {
            if (event.data.type === 'got-image') {
                let resolve = newWorker.queries.get(event.data.resolveId);
                if (!resolve) {
                    console.error('missing promise ID');
                    return;
                }
                newWorker.queries.delete(event.data.resolveId);
                resolve.resolve(event.data.blob);
            }
            //console.log('reply');
        });

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
