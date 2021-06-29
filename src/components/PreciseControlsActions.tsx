import React from 'react';
import { useAtom } from 'jotai';
import { AppBackgroundUrlAtom, RenderWorkerAtom } from '../atoms';
import { I2W, PRESET_H, PRESET_W, WH } from '../utils/types';
import SizeBoxes from './SizeBoxes';
import saveBlobData from '../utils/saveImage';
import PopupImageSize from './PopupImageSize';
import { useSpring, a } from '@react-spring/web';
import { useKey } from 'react-use';

function PreciseControlsActions() {
    const [worker] = useAtom(RenderWorkerAtom);
    const [, setAppBackgroundUrl] = useAtom(AppBackgroundUrlAtom);
    const [showSelectFileSize, setShowSelectFileSize] = React.useState(false);

    const styles = useSpring({
        opacity: showSelectFileSize ? 1 : 0,
        config: {
            duration: 100
        }
    });

    useKey('F2', () => {
        setAsBackground();
    })

    function appendNew() {
        worker?.postMessage({ type: 'get-preview', smallWidth: PRESET_W, smallHeight: PRESET_H } as I2W.GetPreview);
    }

    async function setAsBackground() {
        if (worker) {
            let blob = await worker.getImage();
            setAppBackgroundUrl(blob);
        }
    }

    async function saveItemPng(size?: WH) {
        setShowSelectFileSize(false);
        if (size) {
            console.log('save');
            if (worker) {
                let blob = await worker.getImage(size);
                saveBlobData(blob, 'noise-gen.png');
            }
        }
    }

    return (
        <div className="p-2 flex space-x-1">

            {/* Canvas size buttons */}
            <div className="px-1 flex-centered space-x-1 border rounded border-gray-400">
                <SizeBoxes />
            </div>

            {/* Preset set as background */}
            <div
                className="border rounded border-gray-400 flex-centered text-gray-500
                transform active-scale cursor-pointer"
                title="Set canvas image as application background (F2)"
                onClick={setAsBackground}
            >
                <svg className="h-6 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>

            {/* Preset + */}
            <div
                className="flex-1 w-8 h-8 border rounded border-gray-400 flex-centered text-gray-500
                transform active-scale cursor-pointer"
                title="Save preset"
                onClick={appendNew}
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.8} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
            </div>

            {/* Preset save */}
            <div className="relative z-10">

                {/* Save button */}
                <div
                    className="flex-1 w-8 h-8 border rounded border-gray-400 flex-centered text-gray-500
                    active-scale cursor-pointer"
                    title="Save image"
                    onClick={() => setShowSelectFileSize((prev) => !prev)}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.8} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                </div>

                {/* Popup */}
                {showSelectFileSize &&
                    <a.div style={styles} className="absolute mt-1 -top-1 right-0">
                        <PopupImageSize onSave={saveItemPng} />
                    </a.div>
                }
            </div>
        </div>
    );
}

export default PreciseControlsActions;
