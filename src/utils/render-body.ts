import SimplexNoise from 'simplex-noise';

export function renderBody(ctx: CanvasRenderingContext2D) {

    let w = ctx.canvas.width;
    let h = ctx.canvas.height;

    const simplex = new SimplexNoise();

    function fn(x: number, y: number) {
        //return simplex.noise2D(x / 16, y / 356);
        //return simplex.noise3D(x / 10, y / 10, 0);
        return simplex.noise4D(x / 20, y / 20, 1, 1);
    }

    var imageData = ctx.getImageData(0, 0, w, h);
    for (var i = 0; i < imageData.data.length; i++) {
      var x = (fn(i % 512, ~~(i / 512)) + 1) * 128;
      imageData.data[i * 4] = x;
      imageData.data[i * 4 + 1] = x;
      imageData.data[i * 4 + 2] = x;
      imageData.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
}

export function renderBody2(ctx: CanvasRenderingContext2D) {
    console.log('rendered', ctx);
    let w = ctx.canvas.width;
    let h = ctx.canvas.height;

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < h; i+=10) {
        ctx.fillStyle = 'tomato';
        ctx.fillRect(0, i, w, 5);
        //console.log([0, i, w, 5]);
    }
}
