import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { PresetData, PRESET_H, PRESET_W } from '@/store/types/app-types';
import { PresetsAtom, RemovePresetAtom, SetRenderParamsAtom } from '@/store';
import { classNames } from '@/utils';
import styles from './Previews.module.scss';
import { IconCross, IconTrash } from '@/components/UI/Icons';

interface PreviewBoxProps {
    item: PresetData;
    deleteItem: (id: string) => void;
    selectItem: (item: PresetData) => void;
}

function PreviewBox({ item, deleteItem, selectItem }: PreviewBoxProps) {
    return (
        <div className={`px-1 py-2 cursor-pointer select-none transform active-scale ${styles.preset}`} onClick={() => selectItem(item)}>
            <div className="relative border-4 border-gray-50" style={{ width: `${PRESET_W + 8}px`, height: `${PRESET_H + 8}px` }}> {/* +8 for double border size */}
                {item.preview &&
                    <>
                        <img
                            className={`w-full h-full object-cover ${styles.maybeBroken}`}
                            src={item.preview} alt="preset"
                        />
                        <div
                            className={`absolute p-1 -top-3 -right-3 border rounded-full text-gray-500 border-gray-500 bg-gray-50 ${styles.removePreset}`}
                            title="Remove preset"
                            onClick={(event) => { event.stopPropagation(); deleteItem(item.id); }}
                        >
                            {/* <IconCross className="h-3 w-3" /> */}
                            <IconTrash className="h-3 w-3" />
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export function Previews() {
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
            {presets.map((preset) => (
                <PreviewBox
                    item={preset}
                    deleteItem={deleteItem}
                    selectItem={selectItem}
                    key={preset.id}
                />
            ))}
        </div>
    );
}
