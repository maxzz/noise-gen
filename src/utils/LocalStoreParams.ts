import { Getter } from 'jotai';
import { ColorCanvasAtom, RenderParamsAtom } from '../atoms';
import { RenderParams, renderParams2Store, renderParams4Store, STORAGE_KEY } from './types';
import debounce from './debounce';

const PARAMS_KEY = `${STORAGE_KEY}-params`;

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
    can: string; // canvasBg
    rpm: string; // renderparams
};

export const defAppSettings: AppConfig = function () {
    let raw = localStorage.getItem(PARAMS_KEY);
    try {
        let data: PackedAppConfig = raw && JSON.parse(raw);
        let rpm = renderParams4Store(data.rpm);
        if (rpm) {
            let config: AppConfig = {
                canvasBg: data.can,
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

export const storeAppParams = debounce((get: Getter) => {
    let data: PackedAppConfig = {
        can: get(ColorCanvasAtom),
        rpm: renderParams2Store(get(RenderParamsAtom)),
    };
    localStorage.setItem(PARAMS_KEY, JSON.stringify(data));
}, 1000);

// (function test() {
//     let packed = renderParams2Store(defAppSettings.renderParams);
//     let unpacked = renderParams4Store(packed);

//     console.log('packed', packed);
//     console.log('unpacked', unpacked);
// })();
