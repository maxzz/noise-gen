import { renderBody } from './render-body';

const runtime: Worker = self as any;

function RunStuff() {
    console.log('running');

    let canvasElm: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;

    runtime.onmessage = (event: MessageEvent) => {
        console.log('got', event);

        let seed: string;

        if (event.data.type === 'init') {
            canvasElm = (event.data.canvas as HTMLCanvasElement)
            ctx = canvasElm.getContext('2d');
        }

        seed = event.data.seed || undefined;

        if (ctx) {
            renderBody(ctx, seed);
        }
    };

    runtime.postMessage('result');
}

RunStuff();
