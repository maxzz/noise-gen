import React from 'react';
import { useAtom } from 'jotai';
import { ColorCanvasAtom } from '@/store';

const BGCOLORS = ['black', 'white', 'transparent'];

const hint = `Perview canvas background: white/black/transparent.\nThe saved image will have a transparent background.`;

export function ButtonChooseColorBg() {
    const [backgorund, setBackgorund] = useAtom(ColorCanvasAtom);

    function onClickChangeBkg() {
        const idx = (BGCOLORS.findIndex((item) => item === backgorund) + 1) % BGCOLORS.length;
        setBackgorund(BGCOLORS[idx]);
    }

    return (
        <button
            className="relative w-8 h-8 dark-frame top-row-button-gradient active-scale rounded border tm-focus-ring"
            title={hint}
            onClick={onClickChangeBkg}
        >
            <div className="px-0.5 w-full h-full flex items-center justify-evenly">
                {/* Iocns */}
                <div className={`${backgorund === 'black' ? 'w-1/2 h-2/3' : 'w-1/3 h-1'} bg-black`}></div>
                <div className={`${backgorund === 'white' ? 'w-1/2 h-2/3' : 'w-1/3 h-1'} bg-white`}></div>
                <div className={`${backgorund === 'transparent' ? 'w-1/2 h-2/3' : 'w-1/3 h-1'} border dark-frame`}></div>
            </div>
        </button>
    );
}
