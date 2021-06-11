import { useAtom } from 'jotai';
import React from 'react';
import { ColorCanvasAtom } from '../atoms';

const bgColors = ['white', 'black', 'transparent'];

function ColorBgPicker() {
    const [backgorund, setBackgorund] = useAtom(ColorCanvasAtom);
    function changeBackground() {
        let newColor = (bgColors.findIndex((item) => item === backgorund) + 1) % bgColors.length;
        setBackgorund(bgColors[newColor]);
    }
    return (
        <div className="w-8 h-8" onClick={changeBackground}>
            <div className="p-1 h-full flex items-center justify-between border-4 border-gray-500 rounded"
                title={`Canvas background: white/black/transparent`}
                style={{borderColor: backgorund}}
            >
                <div className="w-1.5 h-1/2 bg-white"></div>
                <div className="w-1.5 h-1/2 bg-black"></div>
                <div className="w-1.5 h-1/2 border border-gray-500"></div>
            </div>
        </div>
    );
}

export default ColorBgPicker;
