import { RenderParams } from './types';
import { Getter } from 'jotai';
import { ColorCanvasRawAtom, RenderParamsAtom } from '../atoms';
import debounce from './debounce';

export const STORAGE_KEY = 'noise-gen-xp10-525n';

type AppConfig = {
    canvasBg: string;
    renderParams: RenderParams;
};

// pre-defined previews:
//-17.4,6.3,34,2.24
//-17.76,6.3,30.87,0.1
//-11.68,-13.65,116.78,0.1
//15.08,14.54,0.74,0
//-17.09,-0.45,52.13,0
//-18.17,-13.96,5.15,0
//-16.29,15.48,23.94,0.39
//-14.5,-0.27,0.95,0.62
//-2.68,-26.85,12.08,2.4
//21.3,-22.55,161.52,0.1 good for default
//6.3,6.3,321.7,1.96 good for default
//40,40,17.45,0 good for default
//21.3,-36.51,13.87,0.73 good for default
//{"canvasBg":"black","renderParams":{"seed":"43780585678984507","color":"rgba(212,133,30,1)","genParams":{"n1":31.95,"n2":-24.52,"distortion":106.94,"dotDiameter":0.5}}}

type PackedAppConfig = {
    canvasBg: string;
    rpm: string; // renderparams
};

export const defAppSettings: AppConfig = function () {
    let raw = localStorage.getItem(`${STORAGE_KEY}-params`);
    try {
        let data: PackedAppConfig = raw && JSON.parse(raw);
        let rpm = renderParams4Store(data.rpm);
        if (rpm) {
            let config: AppConfig = {
                canvasBg: data.canvasBg,
                renderParams: rpm,
            };
            return config;
        }
    } catch (error) {
    }
    return {
        canvasBg: 'transparent',
        renderParams: {
            seed: '13753932482421605',
            color: '#887ed6',
            genParams: {
                n1: 6.3, // def 10
                n2: 6.3, // def 10
                distortion: 1, // def 2
                dotDiameter: .1, // def 1
            }
        }
    };
}();

export const storeChangesDebounced = debounce((get: Getter) => {
    let data: PackedAppConfig = {
        canvasBg: get(ColorCanvasRawAtom),
        rpm: renderParams2Store(get(RenderParamsAtom)),
    };
    localStorage.setItem(`${STORAGE_KEY}-params`, JSON.stringify(data));
}, 1000);

// packing / unpacking

function renderParams2Store(v: RenderParams): string {
    let arr = [v.color, v.seed, v.genParams.n1, v.genParams.n2, v.genParams.distortion, v.genParams.dotDiameter];
    return `v7|${arr.join('|')}`;
}

function renderParams4Store(packed: string): RenderParams | undefined {
    let arr = (packed || '').split('|');
    if (arr.length !== 7 || arr[0] !== 'v7') {
        return;
    }
    let v: RenderParams = {
        color: arr[1],
        seed: arr[2],
        genParams: {
            n1: +arr[3],
            n2: +arr[4],
            distortion: +arr[5],
            dotDiameter: +arr[6],
        }
    };
    return v;
}

// (function test() {
//     let packed = renderParams2Store(defAppSettings.renderParams);
//     let unpacked = renderParams4Store(packed);

//     console.log('packed', packed);
//     console.log('unpacked', unpacked);
// })();
