import { atom } from "jotai";
import { atomWithCallback } from "@/hooks/atomsX";
import { defPresets, storePresets } from "@/store/io";
import { I2W, I4W, PresetData, PRESET_H, PRESET_W } from "@/store/types";
import { uuid } from "@/utils";
import { ManualSizeAtom, RenderWorkerAtom } from "./canvas";

export const PresetsAtom = atomWithCallback<PresetData[]>(defPresets(), ({ get }) => storePresets(get));

export const RemovePresetAtom = atom(
    null,
    (get, set, id: string) => set(PresetsAtom, get(PresetsAtom).filter((item: PresetData) => item.id !== id))
);

export const UpdatePresetPreviewAtom = atom(
    null,
    (get, set, preview: I4W.PreviewId) => {
        let reader = new FileReader();
        reader.onloadend = function () {
            if (reader.result) {
                let presets = get(PresetsAtom);
                let presetIdx = presets.findIndex((preset: PresetData) => preset.id === preview.id);
                if (presetIdx < 0) {
                    console.log('preset not found. likely removed', preview);
                    return;
                }

                const preset: PresetData = {
                    id: uuid(),
                    preview: reader.result as string,
                    renderParams: preview.renderParams,
                };
                presets[presetIdx] = preset;
                set(PresetsAtom, [...presets]);
            }
        };
        reader.readAsDataURL(preview.blob);
    }
);

export const InitPreviewsUpdateAtom = atom(
    null,
    (get) => {
        const worker = get(RenderWorkerAtom);
        const presets = get(PresetsAtom);
        const canvasSize = get(ManualSizeAtom);
        let index = 0;
        if (worker) {
            presets.forEach((preset: PresetData) => {
                if (!preset.preview) {
                    setTimeout(() => {
                        const msg: I2W.GetPreviewId = {
                            type: 'get-preview-id',
                            smallWidth: PRESET_W,
                            smallHeight: PRESET_H,
                            largeWidth: canvasSize.w,
                            largeHeight: canvasSize.h,

                            id: preset.id,
                            renderParams: preset.renderParams,
                        };
                        worker?.postMessage(msg);
                    }, 400 * index++);
                }
            });
        }
    }
);

const AppendPresetAtom = atom(
    null,
    (get, set, preset: PresetData) => set(PresetsAtom, [...get(PresetsAtom), preset])
);

export const CreateAppendPresetAtom = atom(
    null,
    (_get, set, data: I4W.Preview) => {
        let reader = new FileReader();
        reader.onloadend = function () {
            if (reader.result) {
                const preset: PresetData = {
                    id: uuid(),
                    preview: reader.result as string,
                    renderParams: data.renderParams,
                };
                set(AppendPresetAtom, preset);
            }
        };
        reader.readAsDataURL(data.blob);
    }
);

export const expandPresetsAtom = atom(true);