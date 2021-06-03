import React from 'react';
import { useAtom } from 'jotai';
import { DistortionAtom, DotDiameterAtom, N1Atom, N2Atom } from '../atoms';

function Slider({ value, onChange }: { value: number, onChange: (value: number) => void; }) {
    return (
        <div className="h-5 w-full flex items-center justify-center">
            <input type="range" value={value} onChange={(event) => onChange(+event.target.value)} />
        </div>
    );
}

function Sliders() {
    const [n1, setN1] = useAtom(N1Atom);
    const [n2, setN2] = useAtom(N2Atom);
    const [distortion, setDistortion] = useAtom(DistortionAtom);
    const [dotDiameter, setDotDiameter] = useAtom(DotDiameterAtom);
    return (
        <div>
            <Slider value={n1} onChange={setN1} />
            <Slider value={n2} onChange={setN2} />
            <Slider value={distortion} onChange={setDistortion} />
            <Slider value={dotDiameter} onChange={setDotDiameter} />
        </div>
    );
}

export default Sliders;
