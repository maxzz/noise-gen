import { Getter } from 'jotai';
import { PresetsAtom } from '../atoms';
import debounce from './debounce';
import { PresetData, renderParams2Store, renderParams4Store, STORAGE_KEY } from './types';

const PRESETS_KEY = `${STORAGE_KEY}-presets4`;

type PresetsStoreItem = {
    id: string;
    rpm: string;
};

type PresetsStoreCache = Record<string, string>; // Item ID -> data:string URL

const DEFAULT_PrESETS: PresetsStoreItem[] = [
    { "id": "kqliu57s", "rpm": "v7|#f58e48|v7_3_0.1_0.1_0.1_0.1_13753932482421605|-24.88|26.85|22.82|0.1" },
    { "id": "kqliu7vi", "rpm": "v7|#887ed6|v7_3_0.1_0.1_0.1_0.1_13753932482421605|-24.88|26.85|211.63|0.1" },
    { "id": "kqliwa8r", "rpm": "v7|#4bce4b|v7_3_0.611_0.101_0.1_0.1_13753932482421605|-24.88|-4.92|16.11|0.1" },
];

function RawToLocal(dataRaw: PresetsStoreItem[], cache: PresetsStoreCache = {}): PresetData[] {
    let data = dataRaw.map((preset: PresetsStoreItem): PresetData | undefined => {
        let renderParams = renderParams4Store(preset.rpm);
        return !renderParams || !preset.id ? undefined : {
            id: preset.id,
            preview: cache[preset.id],
            renderParams: renderParams,
        };
    }).filter(Boolean) as PresetData[];
    return data;
}

export function defPresets(): PresetData[] {
    let setsRaw = localStorage.getItem(`${PRESETS_KEY}-sets`);
    let cacheRaw = localStorage.getItem(`${PRESETS_KEY}-cache`);
    if (setsRaw !== null) {
        try {
            let dataRaw = setsRaw && JSON.parse(setsRaw) as PresetsStoreItem[] || [];
            let cache = cacheRaw && JSON.parse(cacheRaw) as PresetsStoreCache || {};
            let data: PresetData[] = RawToLocal(dataRaw, cache);
            return data;
        } catch (error) {
        }
    }
    return RawToLocal(DEFAULT_PrESETS, {});
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
