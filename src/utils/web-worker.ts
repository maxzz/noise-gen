import { gridNoise, NoiseGenerator, RenderContext } from './render-body';
import { I2W, I4W, RenderParams } from './types';

const runtime: Worker = self as any;

interface RenderProps {
    gen: NoiseGenerator;
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    rpm: RenderParams;
}

function renderBody({ gen, ctx, rpm }: RenderProps) {

    const simplex = gen.get(rpm.seed);

    function fn(x: number, y: number) {
        //return simplex.noise2D(x / 10, y / 10);
        return simplex.noise3D(x / 10, y / 10, 1);
        //return simplex.noise4D(x / 20, y / 20, 1, 1);
    }

    let renderContext: RenderContext = {
        ctx,
        noiseFn: fn,
        params: rpm.genParams,
    };

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let paths = gridNoise(renderContext);
    ctx.fillStyle = rpm.color;
    ctx.fill(paths[0]);
}

function RunStuff() {
    //console.log('Worker started');

    let canvasElm: OffscreenCanvas;
    let ctx: CanvasRenderingContext2D | null;
    let noiseGenerator = new NoiseGenerator();
    let noiseGeneratorPreview = new NoiseGenerator();
    let renderParams: RenderParams = {} as RenderParams;

    runtime.onmessage = (event: I2W.Message) => {
        //console.log('Worker got', event.data);

        if (event.data.type === 'init') {
            canvasElm = event.data.canvas as OffscreenCanvas;
            ctx = (canvasElm as any as HTMLCanvasElement).getContext('2d');
            return;
        }

        if (!ctx) {
            console.log('no ctx yet');
            return;
        }

        if (event.data.type === 'run') {
            if (event.data.canvasWidth && event.data.canvasHeight) {
                ctx.canvas.width = event.data.canvasWidth;
                ctx.canvas.height = event.data.canvasHeight;
            }
        }

        if ((!ctx.canvas.width || !ctx.canvas.height) && event.data.type !== 'get-preview-id') {
            console.log('no canvas size yet');
            return;
        }

        switch (event.data.type) {
            case 'run': {
                renderParams = event.data.renderParams;
                renderBody({ gen: noiseGenerator, ctx, rpm: renderParams });
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
                        runtime.postMessage({ type: 'preview-blob', blob, renderParams } as I4W.Preview);
                    });
                }
                break;
            }
            case 'get-preview-id': {
                const ev: I2W.GetPreviewId = event.data;
                let min = Math.min(ev.largeWidth, ev.largeHeight);

                const bigCanvas = new OffscreenCanvas(ev.largeWidth, ev.largeHeight);
                const bigCtx = bigCanvas.getContext('2d');

                const smallCanvas = new OffscreenCanvas(ev.smallWidth, ev.smallHeight);
                const smallCtx = smallCanvas.getContext('2d');

                if (bigCtx && smallCtx) {
                    renderBody({ gen: noiseGeneratorPreview, ctx: bigCtx, rpm: ev.renderParams });
                    smallCtx.drawImage(bigCanvas, 0, 0, min, min, 0, 0, ev.smallWidth, ev.smallHeight);

                    smallCanvas.convertToBlob().then(function _toBlob(blob) {
                        runtime.postMessage({ type: 'preview-blob-id', blob, id: ev.id, renderParams: ev.renderParams } as I4W.PreviewId);
                    });
                }
                break;
            }
            case 'get-image': {
                const promiseId = event.data.promiseId;
                canvasElm.convertToBlob({ quality: 1 }).then(function (blob) {
                    runtime.postMessage({ type: 'got-image', blob, resolveId: promiseId } as I4W.Image);
                });
                break;
            }
        }
    };

    //runtime.postMessage('Worker waiting');
}

RunStuff();
