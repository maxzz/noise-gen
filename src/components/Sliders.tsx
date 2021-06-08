import React from 'react';
import './Sliders.scss';
import { useAtom } from 'jotai';
import { DistortionAtom, DotDiameterAtom, N1Atom, N2Atom, PresetsAtom, RemovePresetAtom, RenderParamsAtom, RenderWorkerAtom } from '../atoms';
import { I2W, PresetData } from '../utils/types';
import { WorkerEx } from '../hooks/useCanvasWorker';
import PresetSizeIcons from './PresetSizeIcons';

function Slider({
    label,
    min,
    max,
    step = .01,
    value,
    onChange
}: { label: string, min: number, max: number, step?: number, value: number, onChange: (value: number) => void; }) {
    return (
        <div className="px-2 w-full h-5 flex items-center justify-center space-x-2 text-xs text-purple-900">
            <div className="w-[4.5rem] flex-none">{label}</div>
            <input
                className="ui-slider" type="range"
                value={value} onChange={(event) => onChange(+event.target.value)}
                min={min} max={max} step={step}
            />
            <input className="w-8 bg-purple-100 text-[.6rem]"
                value={value} onChange={(event) => onChange(+event.target.value)}
            />
        </div>
    );
}

interface PreviewBoxProps {
    item: PresetData;
    deleteItem: (id: string) => void;
    selectItem: (item: PresetData) => void;
}

const PRESET_W = 56;
const PRESET_H = 56;

function PreviewBox({ item, deleteItem, selectItem }: PreviewBoxProps) {
    return (
        <div className="preset mx-1 my-2 cursor-pointer select-none transform active:scale-[.97] border border-gray-300" onClick={() => selectItem(item)}>
            <div className="relative border-4 border-gray-50" style={{ width: `${PRESET_W + 10}px`, height: `${PRESET_H + 10}px` }}>
                {/* +8 for double border size & +2 for image border  */}
                <img
                    className="maybe-broken w-full h-full object-cover border border-gray-300"
                    src={item.preview} alt="preset"
                />

                <div
                    className="absolute p-1 -top-2 -right-1.5
                        border rounded-full text-gray-500 border-gray-500 bg-gray-50
                        remove-preset"
                    onClick={(event) => { event.stopPropagation(); deleteItem(item.id); }}
                >
                    {/* X mark */}
                    <svg className="h-3 w-3" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

            </div>
        </div>
    );
}

const saveBlobData = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = 'none';
    a.id = 'noise-gen-image';
    return function (blob: Blob, fileName: string) {
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function Sliders() {
    const [n1, setN1] = useAtom(N1Atom);
    const [n2, setN2] = useAtom(N2Atom);
    const [distortion, setDistortion] = useAtom(DistortionAtom);
    const [dotDiameter, setDotDiameter] = useAtom(DotDiameterAtom);
    const [worker] = useAtom(RenderWorkerAtom);
    const [presets] = useAtom(PresetsAtom);
    const [, SetRenderParams] = useAtom(RenderParamsAtom);
    const [, removePreset] = useAtom(RemovePresetAtom);

    function appendNew() {
        worker?.postMessage({ type: 'get-preview', smallWidth: PRESET_W, smallHeight: PRESET_H } as I2W.GetPreview);
    }

    async function saveItemPng(event: React.MouseEvent) {
        if (worker) {
            let blob = await worker.getImage();
            saveBlobData(blob, 'noise-gen.png');
        }
    }

    function deleteItem(id: string) {
        removePreset(id);
    }

    function selectItem(item: PresetData) {
        SetRenderParams(item.renderParams);
    }

    return (
        <div className="py-2 bg-purple-100 border rounded border-gray-400">
            <Slider min={-20} max={20} value={n1} onChange={setN1} label="N1" />
            <Slider min={-20} max={20} value={n2} onChange={setN2} label="N2" />
            <Slider min={0} max={200} value={distortion} onChange={setDistortion} label="Distortion" />
            <Slider min={0} max={50} value={dotDiameter} onChange={setDotDiameter} label="Dot diameter" />

            {/* Actions */}
            <div className="px-2 py-2 flex space-x-2">
                <div className="px-1 flex items-center justify-center space-x-1 border rounded border-gray-400">
                    <PresetSizeIcons />
                </div>

                {/* Preset + */}
                <div
                    className="w-full h-8 border rounded border-gray-400 flex items-center justify-center text-gray-400
                        transform active:scale-[.97] cursor-pointer"
                    title="Save preset"
                    onClick={appendNew}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.6} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                </div>
                {/* Preset save */}
                <div
                    className="w-full h-8 border rounded border-gray-400 flex items-center justify-center text-gray-400
                        transform active:scale-[.97] cursor-pointer"
                    title="Save image"
                    onClick={(event) => saveItemPng(event)}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.6} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                </div>
            </div>

            <div className="px-1 flex flex-wrap">
                {/* Presets */}
                {presets.map((item) => (
                    <PreviewBox key={item.id} item={item} deleteItem={deleteItem} selectItem={selectItem} />
                ))}
            </div>
        </div>
    );
}

export default Sliders;
