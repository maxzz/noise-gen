import noise from 'simplex-noise';

export function renderBody(ctx: CanvasRenderingContext2D) {
    console.log('rendered', ctx);
    let w = ctx.canvas.width;
    let h = ctx.canvas.height;

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < h; i+=10) {
        ctx.fillStyle = 'tomato';
        ctx.fillRect(0, i, w, 5);
        console.log([0, i, w, 5]);
    }
}
