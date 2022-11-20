import React from 'react';
import { useSetAtom } from 'jotai';
import { ShowNoiseEditorAtom } from '@/store';
import { IconCosine } from '@/components/UI/Icons';

export function ButtonShowNoise() {
    const setShowNoiseEditor = useSetAtom(ShowNoiseEditorAtom);
    return (
        <div
            className="dark-frame-rounded cursor-pointer text-gray-100 active-scale top-row-button-gradient"
            title="Show/Hide noise parameters"
            onClick={() => setShowNoiseEditor(prev => !prev)}
        >
            <IconCosine />
        </div>
    );
}

