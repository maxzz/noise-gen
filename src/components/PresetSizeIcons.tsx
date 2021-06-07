import { useAtom } from 'jotai';
import React from 'react';
import { ManualSizeAtom } from '../atoms';

function SizeIcon({setSize}: {setSize: (w: number, h: number) => void}) {
    return (
        <div
            className="flex items-center justify-center
                text-gray-400
                transform active:scale-[.97] cursor-pointer"
            title="300 x 300"
            onClick={() => { setSize(300, 300); }}
        >
            {/* border rounded-sm border-gray-400 text-gray-400 */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                {/* <path fill="#0f0" d="M.5.5h23v23H.5z" /> */}
                <path d="M23 1v22H1V1h22m1-1H0v24h24V0z" />
                {/* <path fill="#0f0" d="M2.6 2.6h18.7v18.7H2.6z" /> */}
                <path d="M20.8 3.2v17.7H3.2V3.2h17.6m1.1-1.1H2.1v19.8h19.8V2.1z" />
                {/* <path fill="#0f0" d="M5 5h14.1v14.1H5z" /> */}
                <path d="M18.5 5.5v13.1h-13V5.5h13m1-1h-15v15.1h15.1V4.5h-.1z" />
                <path fill="#0f0" d="M7.2 7.2h9.7v9.7H7.2z" />
                <path d="M16.3 7.7v8.7H7.7V7.7h8.6m1-1H6.7v10.7h10.7V6.7h-.1z" />
            </svg>
        </div>
    );
}

function PresetSizeIcons() {
    const [manualSize, setManualSize] = useAtom(ManualSizeAtom);

    function setSize(w: number, h: number) {
        setManualSize({ w, h });
    }

    return (
        <>
            {/* <div className="px-1 flex items-center justify-center space-x-1 border rounded border-gray-400"> */}
            {/* Preset size 1 */}
                <SizeIcon setSize={setSize} />
            {/* Preset size 2 */}
            <div
                className="w-full h-6 border rounded border-gray-400 flex items-center justify-center text-gray-400
                    transform active:scale-[.97] cursor-pointer"
                title="500 x 500"
                onClick={() => { setSize(500, 500); }}
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.6} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
            </div>
            {/* Preset size 3 */}
            <div
                className="w-full h-6 border rounded border-gray-400 flex items-center justify-center text-gray-400
                    transform active:scale-[.97] cursor-pointer"
                title="700 x 700"
                onClick={() => { setSize(700, 700); }}
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.6} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
            </div>
            {/* Preset size 4 */}
            <div
                className="w-full h-6 border rounded border-gray-400 flex items-center justify-center text-gray-400
                    transform active:scale-[.97] cursor-pointer"
                title="1000 x 1000"
                onClick={() => { setSize(1000, 1000); }}
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.6} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
            </div>
            {/* </div> */}
        </>
    );
}

export default PresetSizeIcons;
