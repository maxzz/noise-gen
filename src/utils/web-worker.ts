import noise from 'simplex-noise';

const ctx: Worker = self as any;

function RunStuff() {
    console.log('running');
    ctx.postMessage('result')
}

RunStuff();
