import { Getter } from 'jotai';
import { PresetsAtom } from '../atoms';
import debounce from './debounce';
import { PresetData, RenderParams, STORAGE_KEY } from './types';

const PRESETS_KEY = `${STORAGE_KEY}-presets2`;

type PresetsStoreItem = {
    id: string;
    rpm: RenderParams;
}

type PresetsStoreCache = Record<string, string>; // Item ID -> data:string URL

export function defPresets(): PresetData[] {
    let setsRaw = localStorage.getItem(`${PRESETS_KEY}-sets`);
    let cacheRaw = localStorage.getItem(`${PRESETS_KEY}-cache`);
    try {
        let data = setsRaw && JSON.parse(setsRaw) as PresetData[] || [];
        let cache = cacheRaw && JSON.parse(cacheRaw) as PresetsStoreCache || {};

        data.forEach((preset: PresetData) => preset.preview = cache[preset.id]);

        return data;
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
    let dataRaw: PresetData[] = get(PresetsAtom);

    let cache: PresetsStoreCache = {};
    let data = dataRaw.map((preset: PresetData): PresetsStoreItem => {
        preset.preview && (cache[preset.id] = preset.preview);
        return {id: preset.id, rpm: preset.renderParams};
    });

    localStorage.setItem(`${PRESETS_KEY}-sets`, JSON.stringify(data));
    localStorage.setItem(`${PRESETS_KEY}-cache`, JSON.stringify(cache));
}, 1000);
