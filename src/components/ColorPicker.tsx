import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { colorAtom } from '../atoms';
import { ChromePicker, ColorResult } from 'react-color';

export default function ColorPicker(props: { className: string, style?: React.CSSProperties; }) {
    const { className, style = {} } = props;
    const [color, setColor] = useAtom(colorAtom);
    const [isDown, isDownSet] = useState<boolean>(false);
    return (
        <div className="relative">
            <div
                className={`${className} p-1 border rounded border-gray-400 bg-purple-100 transform active:scale-95`}
                style={{ ...style }}
                onClick={() => isDownSet(v => !v)}
            >
                <div className="w-full h-full rounded" style={{ backgroundColor: color }}></div>
            </div>
            <div className={`absolute right-0 top-full z-10 ${isDown ? '' : 'hidden'}`}>
                <ChromePicker color={color} onChange={(color: ColorResult) => {
                    setColor(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
                }} />
            </div>
        </div>
    );
}
