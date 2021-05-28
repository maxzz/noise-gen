import SimplexNoise from 'simplex-noise';

type RenderContext = {
    ctx: CanvasRenderingContext2D;
    n1: number;
    n2: number;
    distortion: number;
    color: string;
};

function gridNoise(renderContext: RenderContext, fn: (x: number, y: number) => number) {
    const {
        ctx
    } = renderContext;

    let w = ctx.canvas.width;
    let h = ctx.canvas.height;

    var dotMargin = 0;
    let dotDiameter = 1;
    let dotRadius = dotDiameter / 2;
    let xMargin = 1;
    let distortion = renderContext.distortion;
    var numRows = h;
    var numCols = w;
    let outsideMargin = -20;

    ctx.clearRect(0, 0, w, h);

    let p = new Path2D();

    for (let loopY = outsideMargin; loopY < numRows - outsideMargin; loopY++) {
        for (let loopX = outsideMargin; loopX < numCols - outsideMargin; loopX++) {

            let x = loopX * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;
            let y = loopY * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;

            let c = renderContext.color;
            ctx.fillStyle = c;

            let noisex = fn(x / renderContext.n1, y / renderContext.n2);
            let noisey = fn(x / renderContext.n2, y / renderContext.n1);

            let x2 = x + distortion * noisex;
            let y2 = y + distortion * noisey;

            p.rect(x2, y2, 1, 1);
        }
    }

    ctx.fill(p);

    // mainCanvas.convertToBlob({ quality: 1 }).then(function (blob) {
    //   downloadData = blob;
    // });
}

export function renderBody(ctx: CanvasRenderingContext2D, seed: string, color: string) {

    const simplex = new SimplexNoise(seed);

    function fn(x: number, y: number) {
        return simplex.noise2D(x / 36, y / 10);
        //return simplex.noise3D(x / 10, y / 10, 0);
        //return simplex.noise4D(x / 20, y / 20, 1, 1);
    }

    let renderContext: RenderContext = {
        ctx,
        n1: 10,
        n2: 10,
        distortion: 2,
        color: color
    };
    gridNoise(renderContext, fn);
}

export function renderBody3(ctx: CanvasRenderingContext2D) {

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

    for (let i = 0; i < h; i += 10) {
        ctx.fillStyle = 'tomato';
        ctx.fillRect(0, i, w, 5);
        //console.log([0, i, w, 5]);
    }
}
