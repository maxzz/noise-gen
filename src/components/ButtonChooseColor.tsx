import React, { useRef, useState } from 'react';
import './ButtonChooseColor.scss';
import { SketchPicker, ColorResult } from 'react-color';
import { useClickAway } from 'react-use';
import { useAtom } from 'jotai';
import { ColorAtom } from '../atoms';
import { useSpring, a } from '@react-spring/web';

type ButtonChooseColorProps = {
    className: string;
    style?: React.CSSProperties;
};

export default function ButtonChooseColor(props: ButtonChooseColorProps) {
    const { className, style = {} } = props;
    const [color, setColor] = useAtom(ColorAtom);
    const [isDown, setIsDown] = useState<boolean>(false);
    const containerRef = useRef<HTMLButtonElement>(null);
    useClickAway(containerRef, () => setIsDown(false));

    const anim = useSpring({
        opacity: isDown ? 1 : 0,
        config: {
            duration: 200
        }
    });

    return (
        <button
            className="relative no-active-ouline"
            ref={containerRef}
            title="Change canvas color"
            onKeyDown={((event) => {
                if (event.key === 'Escape') {
                    setIsDown(false);
                }
            })}
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
            <a.div className={`absolute right-0 top-full z-20`} style={{ opacity: anim.opacity }}> {/* ${isDown ? '' : 'hidden'} */}
                {isDown && <SketchPicker
                    color={color}
                    onChange={(color: ColorResult) => setColor(color.hex)}
                />}
            </a.div>
        </button>
    );
}
