import { NoiseGenerator, renderBody } from './render-body';

export type GenParams = {
    n1: number;
    n2: number;
    distortion: number;
    dotDiameter: number;
};

export type RenderParams = {
    seed: string;
    color: string;
    genParams: GenParams;
};

export type PresetData = {
    id: string;
    preview?: string;
    renderParams: RenderParams;
};

export namespace I2W { // To Worker
}

export namespace I4W { // From Worker
    export type Message = {
        data: Preview;
    };

    export type Preview = {
        type: 'preview-blob';
        blob: Blob,
        renderParams: RenderParams;
    }
}

const runtime: Worker = self as any;

function RunStuff() {
    //console.log('Worker started');

    let canvasElm: OffscreenCanvas;
    let ctx: CanvasRenderingContext2D | null;
    let noiseGenerator = new NoiseGenerator();
    let seed: string;
    let color: string = 'red';
    let genParams: GenParams;

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
                genParams = event.data.params as GenParams;

                renderBody(noiseGenerator, ctx, seed, color, genParams);
                break;
            }
            case 'get-image': {
                canvasElm.convertToBlob({ quality: 1 }).then(function (blob) {
                    runtime.postMessage({ type: 'image-blob', blob });
                });
                break;
            }
            case 'get-preview': {
                let dimention = event.data.dimention || 32;

                const smallCanvas = new OffscreenCanvas(dimention, dimention);
                const smallCtx = smallCanvas.getContext('2d');
                if (smallCtx) {
                    let min = Math.min(canvasElm.width, canvasElm.height);
                    smallCtx.drawImage(canvasElm, 0, 0, min, min, 0, 0, dimention, dimention);

                    smallCanvas.convertToBlob().then(function _toBlob(blob) {
                        let msg: I4W.Preview = {
                            type: 'preview-blob',
                            blob,
                            renderParams: {
                                seed,
                                color,
                                genParams,
                            }
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
