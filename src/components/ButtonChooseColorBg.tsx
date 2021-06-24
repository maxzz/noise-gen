import { useAtom } from 'jotai';
import React from 'react';
import { ColorCanvasAtom } from '../atoms';

const bgColors = ['black', 'white', 'transparent'];
const bgTitle = `Perview canvas background: white/black/transparent.
The saved image will have a transparent background.`;

function ButtonChooseColorBg() {
    const [backgorund, setBackgorund] = useAtom(ColorCanvasAtom);
    function changeBackground() {
        let newColor = (bgColors.findIndex((item) => item === backgorund) + 1) % bgColors.length;
        setBackgorund(bgColors[newColor]);
    }
    return (
        <div
            className="w-8 h-8 rounded border-dark-frame active:scale-[.97] relative cursor-pointer"
            style={{borderWidth: backgorund === 'transparent' ? 1 : 0}}
            title={bgTitle}
            onClick={changeBackground}
        >
            <div className="absolute border border-dark-frame rounded-[0.15rem] inset-[2px]"></div>

            <div className="py-2 h-full flex items-center justify-evenly border-2 border-dark-frame rounded"

                style={{borderColor: backgorund}}
            >
                <div className="w-1.5 h-1/2 bg-black"></div>
                <div className="w-1.5 h-1/2 bg-white"></div>
                <div className="w-1.5 h-1/2 border border-dark-frame"></div>
            </div>
        </div>
    );
}

export default ButtonChooseColorBg;
