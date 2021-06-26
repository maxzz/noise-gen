import React from 'react';
import { useAtom } from 'jotai';
import { PresetsAtom, RemovePresetAtom, SetRenderParamsAtom } from '../atoms';
import { PresetData, PRESET_H, PRESET_W } from '../utils/types';
import PreciseControlsSliders from './PreciseControlsSliders';
import PreciseControlsActions from './PreciseControlsActions';

interface PreviewBoxProps {
    item: PresetData;
    deleteItem: (id: string) => void;
    selectItem: (item: PresetData) => void;
}

function PreviewBox({ item, deleteItem, selectItem }: PreviewBoxProps) {
    return (
        <div className="preset px-1 py-2 cursor-pointer select-none transform active-scale" onClick={() => selectItem(item)}>
            <div className="relative border-4 border-gray-50" style={{ width: `${PRESET_W + 8}px`, height: `${PRESET_H + 8}px` }}>
                {/* +8 for double border size */}
                {item.preview && <img
                    className="maybe-broken w-full h-full object-cover"
                    src={item.preview} alt="preset"
                />}

                {item.preview && <div
                    className="absolute p-1 -top-2 -right-1.5
                        border rounded-full text-gray-500 border-gray-500 bg-gray-50
                        remove-preset"
                    onClick={(event) => { event.stopPropagation(); deleteItem(item.id); }}
                >
                    {/* X mark */}
                    <svg className="h-3 w-3" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>}

            </div>
        </div>
    );
}

function PreviewBoxes() {
    const [presets] = useAtom(PresetsAtom);
    const [, setRenderParams] = useAtom(SetRenderParamsAtom);
    const [, removePreset] = useAtom(RemovePresetAtom);

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

function PreciseControls() {
    return (
        <div className="py-2 bg-purple-100 border rounded border-gray-400 select-none shadow">
            <PreciseControlsSliders />
            <PreciseControlsActions />
            <PreviewBoxes />
        </div>
    );
}

export default PreciseControls;
