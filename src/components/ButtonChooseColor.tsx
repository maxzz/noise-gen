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
    const ref = useRef<HTMLButtonElement>(null);
    useClickAway(ref, () => setIsDown(false));

    return (
        <button
            className="relative no-active-ouline"
            ref={ref}
            title="Change canvas color"
        >
            {/* Button outer */}
            <div
                className={`${className} dark-frame-rounded bg-purple-100 transform active-scale cursor-pointer flex-centered`}
                style={{ ...style }}
                onClick={() => setIsDown(v => !v)}
            >
                {/* Button inner */}
                <div className="w-5 h-5 rounded-[0.15rem] border border-t-gray-500 border-l-gray-500 border-b-purple-300 border-r-purple-300" style={{ backgroundColor: color }}></div>
            </div>

            {/* Color picker */}
            <div className={`absolute right-0 top-full z-10 ${isDown ? '' : 'hidden'}`}>
                <SketchPicker
                    color={color}
                    onChange={(color: ColorResult) => setColor(color.hex)}
                />
            </div>
        </button>
    );
}
