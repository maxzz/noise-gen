import React, { useRef, useState } from 'react';
import './ButtonChooseColor.scss';
import { SketchPicker, ColorResult } from 'react-color';
import { useClickAway } from 'react-use';
import { useAtom } from 'jotai';
import { ColorAtom } from '../atoms';

export default function ButtonChooseColor(props: { className: string, style?: React.CSSProperties; }) {
    const {
        className,
        style = {}
    } = props;

    const [color, setColor] = useAtom(ColorAtom);
    const [isDown, isDownSet] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);
    useClickAway(ref, () => isDownSet(false));

    return (
        <div className="relative select-none" ref={ref} title="Canvas color selection">
            <div
                className={`${className} p-1 dark-frame-rounded bg-purple-100 transform active:scale-95 cursor-pointer`}
                style={{ ...style }}
                onClick={() => isDownSet(v => !v)}
            >
                <div className="w-full h-full rounded-[0.1rem]" style={{ backgroundColor: color }}></div>
            </div>
            <div className={`absolute right-0 top-full z-10 ${isDown ? '' : 'hidden'}`}>
                <SketchPicker color={color} onChange={(color: ColorResult) => {
                    setColor(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
                }} />
            </div>
        </div>
    );
}
