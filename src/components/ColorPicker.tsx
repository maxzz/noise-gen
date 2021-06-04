import React, { useRef, useState } from 'react';
import './ColorPicker.scss';
import { SketchPicker, ColorResult } from 'react-color';
import { useClickAway } from 'react-use';
import { useAtom } from 'jotai';
import { ColorAtom } from '../atoms';

export default function ColorPicker(props: { className: string, style?: React.CSSProperties; }) {
    const {
        className,
        style = {}
    } = props;

    const [color, setColor] = useAtom(ColorAtom);
    const [isDown, isDownSet] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);
    useClickAway(ref, () => isDownSet(false));

    return (
        <div className="relative select-none" ref={ref}>
            <div
                className={`${className} p-1 border rounded border-gray-400 bg-purple-100 transform active:scale-95`}
                style={{ ...style }}
                onClick={() => isDownSet(v => !v)}
            >
                <div className="w-full h-full rounded" style={{ backgroundColor: color }}></div>
            </div>
            <div className={`absolute right-0 top-full z-10 ${isDown ? '' : 'hidden'}`}>
                <SketchPicker color={color} onChange={(color: ColorResult) => {
                    setColor(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
                }} />
            </div>
        </div>
    );
}
