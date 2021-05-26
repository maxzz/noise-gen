import { renderBody } from './render-body';

const runtime: Worker = self as any;

function RunStuff() {
    console.log('running');

    let ctx: CanvasRenderingContext2D | null;

    runtime.onmessage = (event: MessageEvent) => {
        console.log('got', event);

        if (event.data.type === 'init') {
            let offscreen = (event.data.canvas as HTMLCanvasElement)
            ctx = offscreen.getContext('2d');
        }
        if (ctx) {
            renderBody(ctx);
        }
    };

    runtime.postMessage('result')
}

RunStuff();
