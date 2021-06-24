import React, { useRef, useState } from 'react';
import './ButtonChooseColor.scss';
import { SketchPicker, ColorResult } from 'react-color';
import { useClickAway } from 'react-use';
import { useAtom } from 'jotai';
import { ColorAtom } from '../atoms';

type ButtonChooseColorProps = {
    className: string;
    style?: React.CSSProperties;
};

export default function ButtonChooseColor(props: ButtonChooseColorProps) {
    const { className, style = {} } = props;
    const [color, setColor] = useAtom(ColorAtom);
    const [isDown, setIsDown] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);
    useClickAway(ref, () => setIsDown(false));

    return (
        <div
            className="relative select-none"
            ref={ref}
            title="Change canvas color"
        >
            {/* Button outer */}
            <div
                className={`${className} p-1 dark-frame-rounded bg-purple-100 transform active:scale-95 cursor-pointer`}
                style={{ ...style }}
                onClick={() => setIsDown(v => !v)}
            >
                {/* Button inner */}
                <div className="w-full h-full rounded-[0.1rem]" style={{ backgroundColor: color }}></div>
            </div>

            {/* Color picker */}
            <div className={`absolute right-0 top-full z-10 ${isDown ? '' : 'hidden'}`}>
                <SketchPicker
                    color={color}
                    onChange={(color: ColorResult) => {
                        //setColor(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
                        setColor(color.hex);
                    }}
                />
            </div>
        </div>
    );
}
