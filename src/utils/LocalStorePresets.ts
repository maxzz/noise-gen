import { Getter } from 'jotai';
import { PresetsAtom } from '../atoms';
import debounce from './debounce';
import { PresetData, STORAGE_KEY } from './types';

type PresetsStoreItems = {

}

type PresetsStoreCache = {

}

export function defPresets(): PresetData[] {
    let raw = localStorage.getItem(`${STORAGE_KEY}-presets2`);
    try {
        let data = raw && JSON.parse(raw) as PresetData[];
        return data || [];
        //let rpm = renderParams4Store(data.rpm);
        // if (rpm) {
        //     let config: AppConfig = {
        //         canvasBg: data.can,
        //         renderParams: rpm,
        //     };
        //     return config;
        // }
    } catch (error) {
    }
    return [];
};

export const storePresets = debounce((get: Getter) => {
    let data: PresetData[] = get(PresetsAtom);
    localStorage.setItem(`${STORAGE_KEY}-presets2`, JSON.stringify(data));
}, 1000);
