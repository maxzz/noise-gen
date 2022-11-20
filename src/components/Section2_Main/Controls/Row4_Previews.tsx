import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { PresetData, PRESET_H, PRESET_W } from '@/store/types';
import { PresetsAtom, RemovePresetAtom, SetRenderParamsAtom } from '@/store';
import { IconCross, IconTrash } from '@/components/UI/Icons';
import styles from './Row4_Previews.module.scss';

function PreviewBox({ item }: {item: PresetData}) {
    const setRenderParams = useSetAtom(SetRenderParamsAtom);
    const removePreset = useSetAtom(RemovePresetAtom);
    return (
        <div className={`px-1 py-2 cursor-pointer select-none transform active-scale ${styles.preset}`} onClick={() => setRenderParams(item.renderParams)}>
            <div className="relative border-4 border-gray-50 shadow" style={{ width: `${PRESET_W + 8}px`, height: `${PRESET_H + 8}px` }}> {/* +8 for double border size */}
                {item.preview &&
                    <>
                        <img className={`w-full h-full object-cover ${styles.maybeBroken}`} src={item.preview} alt="preset"/>
                        <div
                            className={`absolute p-1 -top-3 -right-3 border rounded-full text-gray-500 border-gray-500 bg-gray-50 ${styles.removePreset}`}
                            title="Remove preset"
                            onClick={(event) => { event.stopPropagation(); removePreset(item.id); }}
                        >
                            <IconTrash className="h-3 w-3 stroke-2" /> {/* <IconCross className="h-3 w-3" /> */}
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export function Row4_Previews() {
    const presets = useAtomValue(PresetsAtom);
    return (
        <div className="px-1 flex flex-wrap">
            {presets.map((preset) => (
                <PreviewBox item={preset} key={preset.id} />
            ))}
        </div>
    );
}
