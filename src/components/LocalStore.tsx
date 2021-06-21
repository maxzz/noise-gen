import React from 'react';
import { Getter, useAtom } from 'jotai';
import { ColorCanvasRawAtom, RenderParamsAtom } from '../atoms';
import debounce from '../utils/debounce';
import { RenderParams } from '../utils/types';

export const STORAGE_KEY = 'noise-gen-xp10-525n';

type AppConfig = {
    canvasBg: string;
    renderParams: RenderParams;
};

/*
export const AppConfigAtom = atomWithStorage<AppConfig>(`${STORAGE_KEY}-params`, {
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
});
*/

export const defConfig: AppConfig = function () {
    let raw = localStorage.getItem(`${STORAGE_KEY}-params`);
    try {
        let config: AppConfig = raw && JSON.parse(raw);
        return config;
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
    let data: AppConfig = {
        canvasBg: get(ColorCanvasRawAtom),
        renderParams: get(RenderParamsAtom),
    };
    localStorage.setItem(`${STORAGE_KEY}-params`, JSON.stringify(data));
    console.log('debounced store params', { canvasBg: data.canvasBg, render: data.renderParams });
}, 1000);

const LocalStore: React.FC = ({ children }) => {
    console.log('------init------');
    return (
        <>
            {children}
        </>
    );
};

export default LocalStore;

