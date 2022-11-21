import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Row2_NoiseEditor } from './Row2_NoiseEditor';
import { N1Atom, N2Atom, DistortionAtom, DotDiameterAtom, ShowNoiseEditorAtom } from '@/store';
import { GENPARAMS } from '@/store/types';
import { Slider } from '@/components/UI/Slider';

function Sliders1() {
    const [n1, setN1] = useAtom(N1Atom);
    return (
        <Slider min={GENPARAMS.min.n1} max={GENPARAMS.max.n1} value={n1} onChange={setN1} label="Noise 1" />
    );
}

function Sliders2() {
    const [n2, setN2] = useAtom(N2Atom);
    return (
        <Slider min={GENPARAMS.min.n2} max={GENPARAMS.max.n2} value={n2} onChange={setN2} label="Noise 2" />
    );
}

function Sliders3() {
    const [distortion, setDistortion] = useAtom(DistortionAtom);
    return (
        <Slider min={GENPARAMS.min.distortion} max={GENPARAMS.max.distortion} value={distortion} onChange={setDistortion} label="Distortion" />
    );
}

function Sliders4() {
    const [dotDiameter, setDotDiameter] = useAtom(DotDiameterAtom);
    return (
        <Slider min={GENPARAMS.min.dotDiameter} max={GENPARAMS.max.dotDiameter} value={dotDiameter} onChange={setDotDiameter} label="Dot diameter" />
    );
}

export function Row2_Sliders() {
    const showNoiseEditor = useAtomValue(ShowNoiseEditorAtom);
    return (
        <div className="flex">
            <div className="flex-1">
                <Sliders1 />
                <Sliders2 />
                <Sliders3 />
                <Sliders4 />
            </div>
            {/* Editors separator */}
            {showNoiseEditor && <div className="w-[1px] max-w-[1px] bg-purple-300"></div>}
            <Row2_NoiseEditor />
        </div>
    );
}
