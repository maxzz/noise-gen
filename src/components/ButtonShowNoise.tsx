import React from 'react';
import { useAtom } from 'jotai';
import { ShowNoiseEditorAtom } from '../atoms';

function ButtonShowNoise() {
    const [, setShowNoiseEditor] = useAtom(ShowNoiseEditorAtom);
    return (
        <div
            className="dark-frame-rounded cursor-pointer text-gray-100"
            style={{ background: 'linear-gradient(hsla(0,0%,100%,.5), transparent) rgb(167, 139, 250) border-box' }}
            title="Show/Hide noise parameters"
            onClick={() => setShowNoiseEditor(prev => !prev)}
        >
            <svg className="" viewBox="0 0 101 101" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="M88.3 139c11.6-34 23.8-35.6 35 0 10.5 33.2 23.4 34 35 0" transform="translate(-72.8 -88)" />
                <path d="M15.4 32.4v35.7M12.1 50.5h78.8" />
            </svg>
        </div>
    );
}

export default ButtonShowNoise;
