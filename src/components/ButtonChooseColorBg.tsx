import { useAtom } from 'jotai';
import React from 'react';
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
            className="w-8 h-8 relative rounded dark-frame no-active-ouline active-scale"
            style={{borderWidth: backgorund === 'transparent' ? 1 : 0}}
            title={hint}
            onClick={changeBkg}
        >
            {/* <div className="absolute border dark-frame rounded-[0.15rem] inset-[2px]"></div> */}

            <div
                className="py-2 h-full flex items-center justify-evenly border-2 dark-frame rounded"
                style={{borderColor: backgorund}}
            >
                <div className="w-1.5 h-1/2 bg-black"></div>
                <div className="w-1.5 h-1/2 bg-white"></div>
                <div className="w-1.5 h-1/2 border dark-frame"></div>
            </div>
        </button>
    );
}

// function ButtonChooseColorBg() {
//     const [backgorund, setBackgorund] = useAtom(ColorCanvasAtom);
//     function changeBackground() {
//         let newColor = (bgColors.findIndex((item) => item === backgorund) + 1) % bgColors.length;
//         setBackgorund(bgColors[newColor]);
//     }
//     return (
//         <div
//             className="w-8 h-8 rounded dark-frame active-scale relative cursor-pointer"
//             style={{borderWidth: backgorund === 'transparent' ? 1 : 0}}
//             title={bgTitle}
//             onClick={changeBackground}
//         >
//             <div className="absolute border dark-frame rounded-[0.15rem] inset-[2px]"></div>

//             <div className="py-2 h-full flex items-center justify-evenly border-2 dark-frame rounded"

//                 style={{borderColor: backgorund}}
//             >
//                 <div className="w-1.5 h-1/2 bg-black"></div>
//                 <div className="w-1.5 h-1/2 bg-white"></div>
//                 <div className="w-1.5 h-1/2 border dark-frame"></div>
//             </div>
//         </div>
//     );
// }

export default ButtonChooseColorBg;
