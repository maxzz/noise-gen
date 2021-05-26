import noise from 'simplex-noise';

const ctx: Worker = self as any;

function RunStuff() {
    console.log('running');
    ctx.onmessage = (event: MessageEvent) => {
        console.log('got', event);
    };
    ctx.postMessage('result')
}

RunStuff();
