import { renderBody } from './render-body';

const ctx: Worker = self as any;

function RunStuff() {
    console.log('running');
    ctx.onmessage = (event: MessageEvent) => {
        console.log('got', event);
        renderBody();
    };
    ctx.postMessage('result')
}

RunStuff();
