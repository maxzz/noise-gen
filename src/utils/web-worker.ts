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
                let pm = event.data.params as RenderParams;

                renderBody(noiseGenerator, ctx, seed, color, pm);
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
                    let ratio = canvasElm.width / canvasElm.height;
                    let x = canvasElm.width - dimention * ratio;
                    let y = canvasElm.height - dimention;
                    smallCtx.drawImage(canvasElm, 0, 0, canvasElm.width, canvasElm.height, x, y, dimention * ratio, dimention);
                    smallCanvas.convertToBlob().then(function (blob) { runtime.postMessage({ type: 'preview-blob', blob }); });
                }
                break;
            }
        }
    };

    runtime.postMessage('Worker waiting');
}

RunStuff();
