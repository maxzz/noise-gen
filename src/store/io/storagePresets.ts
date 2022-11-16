import { Getter } from 'jotai';
import { PresetsAtom } from '@/store';
import { debounce } from '@/utils';
import { PresetData, STORAGE_KEY } from '@/store/types';
import { renderParams2Store, renderParams4Store } from './store-io';

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
    { "id": "kqlzxg2a", "rpm": "v7|#ffa100|v7_3_0.021_0.07_0.001_0.1_1136368222975912|33.083352119335586|28.05622899086245|394.771375644654|0.20978260824037842" }, // TODO: (should be rounded to two) how this happend?
    { "id": "kqr99h97", "rpm": "v7|#28b322|v7_3_0.021_0.07_0.001_0.1_1136368222975912|-1.69|-31.66|106.62|0.07" },
    { "id": "kqr9evc6", "rpm": "v7|#00c0ff|v7_3_0.021_0.07_0.001_0.1_1136368222975912|-8.1|32.88|263.57|0.87" },
    //{ "id": "kqra1mw5", "rpm": "v7|#28b322|v7_3_0.021_0.07_0.001_0.1_4715364555019381|36.08|-6.35|356.62|0.08" }, // good for seeds variations
    //{ "id": "kqra49eh", "rpm": "v7|#28b322|v7_3_0.021_0.07_0.001_0.1_7746239664456585|34.57|-21.58|189.73|0.72" }, // good for seeds variations
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
