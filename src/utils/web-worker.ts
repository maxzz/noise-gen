import { renderBody } from './render-body';

const runtime: Worker = self as any;

function RunStuff() {
    console.log('running');

    let canvasElm: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;

    runtime.onmessage = (event: MessageEvent) => {
        console.log('got', event);

        if (event.data.type === 'init') {
            canvasElm = (event.data.canvas as HTMLCanvasElement)
            ctx = canvasElm.getContext('2d');
        }

        let seed: string = event.data.seed || undefined;
        let color: string = event.data.color || 'red';

        console.log('canvas', canvasElm.width, canvasElm.height);

        if (ctx) {
            // ctx.canvas.width = 100;
            // ctx.canvas.height = 100;
            renderBody(ctx, seed, color);
        }
    };

    runtime.postMessage('result');
}

RunStuff();
