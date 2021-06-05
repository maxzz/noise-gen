import React from 'react';
import './Sliders.scss';
import { useAtom } from 'jotai';
import { DistortionAtom, DotDiameterAtom, N1Atom, N2Atom, PresetsAtom, RenderWorkerAtom } from '../atoms';
import { PresetData } from '../utils/web-worker';

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

function PreviewBox({ item, getPreview }: { item: PresetData, getPreview: () => void; }) {
    return (
        <div className="p-2">
            {item.preview
                ?
                <div className="w-8 h-8 relative" onClick={getPreview}>
                    <img className="ring-1 ring-gray-600 rounded border-gray-400 maybe-broken" width="32px" height="32px" src={item.preview} alt="preset" />
                </div>
                :
                <div className="w-8 h-8 relative" onClick={getPreview}>
                    <div className="ring-1 ring-gray-600 rounded border-gray-400"></div>
                </div>
            }
        </div>
    );
}

function Sliders() {
    const [n1, setN1] = useAtom(N1Atom);
    const [n2, setN2] = useAtom(N2Atom);
    const [distortion, setDistortion] = useAtom(DistortionAtom);
    const [dotDiameter, setDotDiameter] = useAtom(DotDiameterAtom);
    const [worker] = useAtom(RenderWorkerAtom);
    const [presets] = useAtom(PresetsAtom);

    function getPreview() {
        worker?.postMessage({ type: 'get-preview', dimention: 32 });
    }

    return (
        <div className="py-2 bg-purple-100 border rounded border-gray-400">
            <Slider min={-20} max={20} value={n1} onChange={setN1} label="N1" />
            <Slider min={-20} max={20} value={n2} onChange={setN2} label="N2" />
            <Slider min={0} max={200} value={distortion} onChange={setDistortion} label="Distortion" />
            <Slider min={0} max={100} value={dotDiameter} onChange={setDotDiameter} label="Dot diameter" />

            <div className="flex flex-wrap">
                {presets.map((item) => (
                    <PreviewBox key={item.id} item={item} getPreview={getPreview} />
                ))}
                <div className="p-2">
                    <div className="w-8 h-8 border rounded border-gray-400" onClick={getPreview}></div>
                </div>
            </div>
        </div>
    );
}

export default Sliders;
