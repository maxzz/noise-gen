import React from 'react';
import { useSetAtom } from 'jotai';
import { ShowNoiseEditorAtom } from '@/store';

export function ButtonShowNoise() {
    const setShowNoiseEditor = useSetAtom(ShowNoiseEditorAtom);
    return (
        <div
            className="dark-frame-rounded cursor-pointer text-gray-100 active-scale"
            style={{ background: 'linear-gradient(hsla(0,0%,100%,.5), transparent) rgb(167, 139, 250) border-box' }}
            title="Show/Hide noise parameters"
            onClick={() => setShowNoiseEditor(prev => !prev)}
        >
            <svg className="" viewBox="0 0 101 101" fill="none" stroke="currentColor" strokeWidth={4}>
                <path d="M88.3 139c11.6-34 23.8-35.6 35 0 10.5 33.2 23.4 34 35 0" transform="translate(-72.8 -88)" />
                <path d="M15.4 22.4v55.7M12.1 50.5h78.8" strokeWidth={2} />
            </svg>
        </div>
    );
}
