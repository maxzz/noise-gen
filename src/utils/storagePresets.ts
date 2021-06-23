import { Getter } from 'jotai';
import { PresetsAtom } from '../atoms';
import debounce from './debounce';
import { PresetData, renderParams2Store, renderParams4Store, STORAGE_KEY } from './types';

const PRESETS_KEY = `${STORAGE_KEY}-presets2`;

type PresetsStoreItem = {
    id: string;
    rpm: string;
};

type PresetsStoreCache = Record<string, string>; // Item ID -> data:string URL

export function defPresets(): PresetData[] {
    let setsRaw = localStorage.getItem(`${PRESETS_KEY}-sets`);
    let cacheRaw = localStorage.getItem(`${PRESETS_KEY}-cache`);
    try {
        let dataRaw = setsRaw && JSON.parse(setsRaw) as PresetsStoreItem[] || [];
        let cache = cacheRaw && JSON.parse(cacheRaw) as PresetsStoreCache || {};

        let data = dataRaw.map((preset: PresetsStoreItem): PresetData | undefined => {
            let renderParams = renderParams4Store(preset.rpm);
            return !renderParams || !preset.id ? undefined : {
                id: preset.id,
                preview: cache[preset.id],
                renderParams: renderParams,
            };
        }).filter(Boolean) as PresetData[];

        return data;
    } catch (error) {
    }
    return [];
};

export const storePresets = debounce((get: Getter) => {
    let dataRaw: PresetData[] = get(PresetsAtom);

    let cache: PresetsStoreCache = {};
    let data = dataRaw.map((preset: PresetData): PresetsStoreItem => {
        preset.preview && (cache[preset.id] = preset.preview);
        return { id: preset.id, rpm: renderParams2Store(preset.renderParams) };
    });

    localStorage.setItem(`${PRESETS_KEY}-sets`, JSON.stringify(data));
    localStorage.setItem(`${PRESETS_KEY}-cache`, JSON.stringify(cache));
}, 1000);
