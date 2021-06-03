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
    let ctx: OffscreenCanvasRenderingContext2D | null;
    let noiseGenerator = new NoiseGenerator();
    let seed: string;
    let color: string = 'red';

    runtime.onmessage = (event: MessageEvent) => {
        console.log('Worker got', event.data);

        if (event.data.canvas) {
            canvasElm = event.data.canvas as OffscreenCanvas;
            ctx = canvasElm.getContext('2d');
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
            case 'get-render': {
                canvasElm.convertToBlob({ quality: 1 }).then(function (blob) {
                    //
                    console.log('blob', blob);
                });

                break;
            }
        }
    };

    runtime.postMessage('Worker waiting');
}

RunStuff();
