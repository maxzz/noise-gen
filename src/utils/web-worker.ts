import { gridNoise, NoiseGenerator, RenderContext } from './render-body';
import { GenParams, I2W, I4W, RenderParams } from './types';

const runtime: Worker = self as any;

function renderBody(noiseGenerator: NoiseGenerator, ctx: CanvasRenderingContext2D, renderParams: RenderParams) {

    const simplex = noiseGenerator.get(renderParams.seed);

    function fn(x: number, y: number) {
        //return simplex.noise2D(x / 10, y / 10);
        return simplex.noise3D(x / 10, y / 10, 1);
        //return simplex.noise4D(x / 20, y / 20, 1, 1);
    }

    let renderContext: RenderContext = {
        ctx,
        noiseFn: fn,
        params: renderParams.genParams,
    };

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let paths = gridNoise(renderContext);
    ctx.fillStyle = renderParams.color;
    ctx.fill(paths[0]);
}

function RunStuff() {
    //console.log('Worker started');

    let canvasElm: OffscreenCanvas;
    let ctx: CanvasRenderingContext2D | null;
    let noiseGenerator = new NoiseGenerator();
    let renderParams: RenderParams = {} as RenderParams;

    runtime.onmessage = (event: I2W.Message) => {
        console.log('Worker got', event.data);

        if (event.data.type === 'init') {
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
                renderParams.seed = event.data.seed;
                renderParams.color = event.data.color;
                renderParams.genParams = event.data.params as GenParams;
                renderBody(noiseGenerator, ctx, renderParams);
                break;
            }
            case 'get-preview': {
                let w = event.data.smallWidth;
                let h = event.data.smallHeight;

                const smallCanvas = new OffscreenCanvas(w, h);
                const smallCtx = smallCanvas.getContext('2d');
                if (smallCtx) {
                    let min = Math.min(canvasElm.width, canvasElm.height);
                    smallCtx.drawImage(canvasElm, 0, 0, min, min, 0, 0, w, h);

                    smallCanvas.convertToBlob().then(function _toBlob(blob) {
                        runtime.postMessage({
                            type: 'preview-blob',
                            blob,
                            renderParams
                        } as I4W.Preview);
                    });
                }
                break;
            }
            // case 'get-image': {
            //     canvasElm.convertToBlob({ quality: 1 }).then(function (blob) {
            //         runtime.postMessage({ type: 'image-blob', blob });
            //     });
            //     break;
            // }
        }
    };

    //runtime.postMessage('Worker waiting');
}

RunStuff();
