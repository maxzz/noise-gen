import debounce from './debounce';
import { NoiseGenerator, renderBody } from './render-body';

const runtime: Worker = self as any;

function RunStuff() {
    //console.log('Worker started');

    let canvasElm: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;

    let noiseGenerator = new NoiseGenerator();

    runtime.onmessage = (event: MessageEvent) => {
        console.log('Worker got', event.data);

        if (event.data.type === 'init') {
            canvasElm = (event.data.canvas as HTMLCanvasElement)
            ctx = canvasElm.getContext('2d');
        }

        let seed: string = event.data.seed || undefined;
        let color: string = event.data.color || 'red';

        if (ctx) {
            if (event.data.width && event.data.height) {
                ctx.canvas.width = event.data.width;
                ctx.canvas.height = event.data.height;
            }
            if (ctx.canvas.width && ctx.canvas.height) {
                //debounce(() => renderBody(noiseGenerator, ctx, seed, color), 100);
                debounce(renderBody, 100)(noiseGenerator, ctx, seed, color);
                //console.log('canvas', canvasElm.width, canvasElm.height);
            }
        }
    };

    //runtime.postMessage('Worker waiting');
}

RunStuff();
