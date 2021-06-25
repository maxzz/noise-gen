import React from 'react';
import { useAtom } from 'jotai';
import { ColorCanvasAtom } from '../atoms';

const BGCOLORS = ['black', 'white', 'transparent'];

const hint = `Perview canvas background: white/black/transparent.
The saved image will have a transparent background.`;

function ButtonChooseColorBg() {
    const [backgorund, setBackgorund] = useAtom(ColorCanvasAtom);

    function changeBkg() {
        let idx = (BGCOLORS.findIndex((item) => item === backgorund) + 1) % BGCOLORS.length;
        setBackgorund(BGCOLORS[idx]);
    }

    return (
        <button
            className="w-8 h-8 relative rounded border dark-frame no-active-ouline active-scale"
            style={{ background: 'linear-gradient(hsla(0,0%,100%,.5), transparent) rgb(167, 139, 250) border-box' }}
            title={hint}
            onClick={changeBkg}
        >
            <div className="px-0.5 w-full h-full flex items-center justify-evenly">
                {/* Iocns */}
                <div className={`${backgorund === 'black' ? 'w-1/2 h-2/3' : 'w-1/3 h-1'} bg-black`}></div>
                <div className={`${backgorund === 'white' ? 'w-1/2 h-2/3' : 'w-1/3 h-1'} bg-white`}></div>
                <div className={`${backgorund === 'transparent' ? 'w-1/2 h-2/3' : 'w-1/3 h-1'} border dark-frame`}></div>

                {/* <div className={`w-1/3 ${backgorund === 'black' ? 'h-2/3' : 'h-1'} bg-black`}></div>
                <div className={`w-1/3 ${backgorund === 'white' ? 'h-2/3' : 'h-1'} bg-white`}></div>
                <div className={`w-1/3 ${backgorund === 'transparent' ? 'h-2/3' : 'h-1'} border dark-frame`}></div> */}
            </div>
        </button>
    );
}

export default ButtonChooseColorBg;
