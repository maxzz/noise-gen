import { NoiseGenerator, renderBody } from './render-body';

export type RenderParams = {
    n1: number;
    n2: number;
    distortion: number;
    dotDiameter: number;
    color: string;
};

const runtime: Worker = self as any;

function RunStuff() {
    //console.log('Worker started');

    let canvasElm: OffscreenCanvas;
    let ctx: CanvasRenderingContext2D | null;
    let noiseGenerator = new NoiseGenerator();
    let seed: string;
    let color: string = 'red';
    let params: RenderParams;

    runtime.onmessage = (event: MessageEvent) => {
        console.log('Worker got', event.data);

        if (event.data.canvas) {
            canvasElm = event.data.canvas as OffscreenCanvas;
            ctx = (canvasElm as any as HTMLCanvasElement).getContext('2d');
            return;
        }

        if (!ctx) {
            console.log('no ctx yet');
            return;
        }

        if (event.data.width && event.data.height) {
            ctx.canvas.width = event.data.width;
            ctx.canvas.height = event.data.height;
        }

        if (!ctx.canvas.width || !ctx.canvas.height) {
            console.log('no dim yet');
            return;
        }

        switch (event.data.type) {
            case 'run': {
                seed = event.data.seed || undefined;
                color = event.data.color || 'red';
                params = event.data.params as RenderParams;

                renderBody(noiseGenerator, ctx, seed, color, params);
                break;
            }
            case 'get-image': {
                canvasElm.convertToBlob({ quality: 1 }).then(function (blob) {
                    runtime.postMessage({ type: 'image-blob', blob });
                });
                break;
            }
            case 'get-preview': {
                let dimention = event.data.dimention * 4 || 32;

                const smallCanvas = new OffscreenCanvas(dimention, dimention);
                const smallCtx = smallCanvas.getContext('2d');
                if (smallCtx) {
                    let min = Math.min(canvasElm.width, canvasElm.height);
                    smallCtx.drawImage(canvasElm, 0, 0, min, min, 0, 0, dimention, dimention);

                    smallCanvas.convertToBlob().then(function (blob) {
                        let msg = {
                            type: 'preview-blob',
                            blob,
                            params,
                            seed,
                            color,
                        };
                        runtime.postMessage(msg);
                    });
                }
                break;
            }
        }
    };

    runtime.postMessage('Worker waiting');
}

RunStuff();
