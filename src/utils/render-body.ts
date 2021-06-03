import SimplexNoise from 'simplex-noise';
import { RenderParams } from './web-worker';
//import colors from 'simple-color-functions';

type RenderContext = {
    ctx: CanvasRenderingContext2D;
    noiseFn: (x: number, y: number) => number;
    progress?: (v: number) => boolean;    // v - progress [0..1]; running time in ms; returns boolean: continue or stop
    params: RenderParams;
};

function gridNoise(renderContext: RenderContext): Path2D[] {
    const {
        ctx,
        noiseFn: fn,
        params: {
            n1,
            n2,
            distortion,
            dotDiameter,
        }
    } = renderContext;

    let xMargin = 1;
    let dotMargin = 0;
    let outsideMargin = -20;
    let dotRadius = dotDiameter / 2;

    let numCols = ctx.canvas.width;
    let numRows = ctx.canvas.height;

    let p = new Path2D();

    for (let loopY = outsideMargin; loopY < numRows - outsideMargin; loopY++) {
        for (let loopX = outsideMargin; loopX < numCols - outsideMargin; loopX++) {

            let xIn = loopX * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;
            let yIn = loopY * (dotDiameter + xMargin) + dotMargin + xMargin / 2 + dotRadius;

            let noisex = fn(xIn / n1, yIn / n2);
            let noisey = fn(xIn / n2, yIn / n1);

            // if (noisex > 0.02) {
            //     continue;
            // }

            let xOut = xIn + distortion * noisex;
            let yOut = yIn + distortion * noisey;

            p.rect(xOut, yOut, 1, 1);
        }
    }

    return [p];

    // mainCanvas.convertToBlob({ quality: 1 }).then(function (blob) {
    //   downloadData = blob;
    // });
}

export function renderBody(noiseGenerator: NoiseGenerator, ctx: CanvasRenderingContext2D, seed: string, color: string) {

    const simplex = noiseGenerator.get(seed);

    function fn(x: number, y: number) {
        //return simplex.noise2D(x / 10, y / 10);
        return simplex.noise3D(x / 10, y / 10, 1);
        //return simplex.noise4D(x / 20, y / 20, 1, 1);
    }

    let renderContext: RenderContext = {
        ctx,
        noiseFn: fn,
        params: {
            n1: 6.3, // def 10
            n2: 6.3, // def 10
            distortion: 1, // def 2
            dotDiameter: .1, // def 1
            color: color
        },
    };
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let paths = gridNoise(renderContext);

    ctx.fillStyle = color;
    ctx.fill(paths[0]);
}

export class NoiseRender {
    async render() {
        
    }
}

export class NoiseGenerator {
    private _seed: string = '';
    private _noise: SimplexNoise | undefined;
    get(seed: string): SimplexNoise {
        if (this._seed !== seed || !this._noise) {
            this._noise = new SimplexNoise(seed);
            this._seed = seed;
        }
        return this._noise;
    }
}

/*
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
*/