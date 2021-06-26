import React from 'react';
import { useAtom } from 'jotai';
import Slider from './Slider';
import NoiseEditor from './NoiseEditor';
import { N1Atom, N2Atom, DistortionAtom, DotDiameterAtom, ShowNoiseEditorAtom } from '../atoms';
import { GENPARAMS } from '../utils/types';

function Sliders() {
    const [n1, setN1] = useAtom(N1Atom);
    const [n2, setN2] = useAtom(N2Atom);
    const [distortion, setDistortion] = useAtom(DistortionAtom);
    const [dotDiameter, setDotDiameter] = useAtom(DotDiameterAtom);
    return (
        <>
            <Slider min={GENPARAMS.min.n1} max={GENPARAMS.max.n1} value={n1} onChange={setN1} label="Noise 1" />
            <Slider min={GENPARAMS.min.n2} max={GENPARAMS.max.n2} value={n2} onChange={setN2} label="Noise 2" />
            <Slider min={GENPARAMS.min.distortion} max={GENPARAMS.max.distortion} value={distortion} onChange={setDistortion} label="Distortion" />
            <Slider min={GENPARAMS.min.dotDiameter} max={GENPARAMS.max.dotDiameter} value={dotDiameter} onChange={setDotDiameter} label="Dot diameter" />
        </>
    );
}

function PreciseControlsSliders() {
    const [showNoiseEditor] = useAtom(ShowNoiseEditorAtom);
    return (
        <div className="flex">
            <div className="flex-1">
                <Sliders />
            </div>
            {showNoiseEditor && <div className="w-[1px] max-w-[1px] bg-purple-300"></div>}
            <div>
                <NoiseEditor />
            </div>
        </div>
    );
}

export default PreciseControlsSliders;
