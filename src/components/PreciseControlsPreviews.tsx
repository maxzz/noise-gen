import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { PresetData, PRESET_H, PRESET_W } from '../store/app-types';
import { PresetsAtom, RemovePresetAtom, SetRenderParamsAtom } from '../store';
import styles from './PreciseControlsPreviews.module.scss';

interface PreviewBoxProps {
    item: PresetData;
    deleteItem: (id: string) => void;
    selectItem: (item: PresetData) => void;
}

function PreviewBox({ item, deleteItem, selectItem }: PreviewBoxProps) {
    return (
        <div className={`${styles.preset} px-1 py-2 cursor-pointer select-none transform active-scale`} onClick={() => selectItem(item)}>
            <div className="relative border-4 border-gray-50" style={{ width: `${PRESET_W + 8}px`, height: `${PRESET_H + 8}px` }}>
                {/* +8 for double border size */}
                {item.preview && <img
                    className={`${styles.maybeBroken} w-full h-full object-cover`}
                    src={item.preview} alt="preset"
                />}

                {item.preview && <div
                    className={`${styles.removePreset} absolute p-1 -top-3 -right-3 
                        border rounded-full text-gray-500 border-gray-500 bg-gray-50`}
                    title="Remove preset"
                    onClick={(event) => { event.stopPropagation(); deleteItem(item.id); }}
                >
                    {/* X mark */}
                    {/* <svg className="h-3 w-3" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                    </svg> */}

                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>}

            </div>
        </div>
    );
}

export function PreciseControlsPreviews() {
    const presets = useAtomValue(PresetsAtom);
    const setRenderParams = useSetAtom(SetRenderParamsAtom);
    const removePreset = useSetAtom(RemovePresetAtom);

    function deleteItem(id: string) {
        removePreset(id);
    }

    function selectItem(item: PresetData) {
        setRenderParams(item.renderParams);
    }

    return (
        <div className="px-1 flex flex-wrap">
            {presets.map((preset) => <PreviewBox key={preset.id} item={preset} deleteItem={deleteItem} selectItem={selectItem} />)}
        </div>
    );
}
