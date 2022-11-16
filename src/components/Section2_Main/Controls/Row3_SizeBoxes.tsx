import React from 'react';
import { useSetAtom } from 'jotai';
import { ManualSizeAtom } from '@/store';

const SIZES = [[300, 300], [500, 500], [700, 700], [900, 900]];

function SizeIcon({ select, step }: { select: () => void, step: number; }) {
    return (
        <div
            className="
                flex-centered active:scale-95 cursor-pointer 
                text-gray-400 hover:text-purple-600
                ring-purple-400 ring-opacity-50 hover:ring-2 active:ring-2 active:ring-opacity-100"
            title={`Set canvas ${SIZES[step][0]} x ${SIZES[step][1]}`}
            onClick={select}
        >
            {/* border rounded-sm border-gray-400 text-gray-400 */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" >
                {/* Outer */}
                {step === 3 && <path fill="#d6d6d6" d="M.5.5h23v23H.5z" />}
                <path d="M23 1v22H1V1h22m1-1H0v24h24V0z" />

                {step === 2 && <path fill="#d6d6d6" d="M2.6 2.6h18.7v18.7H2.6z" />}
                {step === 2 && <path d="M20.8 3.2v17.7H3.2V3.2h17.6m1.1-1.1H2.1v19.8h19.8V2.1z" />}

                {step === 1 && <path fill="#d6d6d6" d="M5 5h14.1v14.1H5z" />}
                {step === 1 && <path d="M18.5 5.5v13.1h-13V5.5h13m1-1h-15v15.1h15.1V4.5h-.1z" />}

                {/* Inner */}
                {step === 0 && <path fill="#d6d6d6" d="M7.2 7.2h9.7v9.7H7.2z" />}
                {step === 0 && <path d="M16.3 7.7v8.7H7.7V7.7h8.6m1-1H6.7v10.7h10.7V6.7h-.1z" />}
            </svg>
        </div>
    );
}

export function Row3_SizeBoxes() {
    const setManualSize = useSetAtom(ManualSizeAtom);

    function setSize(w: number, h: number) {
        setManualSize({ w, h });
    }

    return (<>
        {SIZES.map(([w, h], idx) => (
            <SizeIcon select={() => setSize(w, h)} step={idx} key={idx} />
        ))}
    </>);
}
