import React from 'react';
import { useAtom } from 'jotai';
import { AppBackgroundUrlAtom, ExportImageSizeAtom, RenderWorkerAtom } from '../atoms';
import { I2W, PRESET_H, PRESET_W, WH } from '../utils/types';
import SizeBoxes from './SizeBoxes';
import saveBlobData from '../utils/saveImage';
import { useClickAway } from 'react-use';

function DimentionsPopup({ onSave }: { onSave: (size?: WH) => void; }) {
    const [exportImageSize, setExportImageSize] = useAtom(ExportImageSizeAtom);
    const [width, setWidth] = React.useState('' + exportImageSize.w);
    const [height, setHeight] = React.useState('' + exportImageSize.h);
    const [valid, setValid] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const firstInputRef = React.useRef<HTMLInputElement>(null);
    useClickAway(containerRef, () => onSave());

    React.useEffect(() => {
        firstInputRef.current?.focus();
    }, []);

    React.useEffect(() => {
        function validInt(v: string): number {
            const n = +(+v).toFixed(0);
            return !isNaN(n) && n > 0 ? n : 0;
        }
        let w = validInt(width);
        let h = validInt(height);
        let isValid = !!w && !!h && w * h <= 2000 * 2000;
        setValid(isValid);
        isValid && setExportImageSize({ w, h });
    }, [width, height]);

    return (
        <div
            className="px-2 pt-1 relative rounded border text-sm border-gray-500 bg-purple-300 flex flex-col shadow-lg text-purple-900"
            onKeyDown={((event) => {
                if (event.key === 'Escape') {
                    onSave();
                }
            })}
            ref={containerRef}
        >

            {/* Close button */}
            <div
                className="absolute top-[2px] right-[2px] p-1.5 rounded activ:bg-red-100 hover:bg-red-400 hover:text-white"
                onClick={() => onSave()}
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            {/* Controls */}
            <div className="mt-4">Image size</div>
            <div className="mt-1 flex items-center space-x-1">
                <input
                    ref={firstInputRef}
                    className="px-2 py-1 w-16 rounded"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    onKeyDown={((event) => {
                        if (valid && event.key === 'Enter') {
                            onSave(exportImageSize);
                        }
                    })}
                />
                <div className="">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <input
                    className="px-2 py-1 w-16 rounded"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    onKeyDown={((event) => {
                        if (valid && event.key === 'Enter') {
                            onSave(exportImageSize);
                        }
                    })}
                />
            </div>

            {/* Save button */}
            <button
                className={
                    `self-end mt-3 mb-2 px-3 py-1 h-8 rounded border active-scale 
                    ${valid ? 'bg-purple-500 text-gray-200 border-gray-200' : 'text-red-600 border-none'}`
                }
                onClick={() => valid && onSave(exportImageSize)}
            >
                <div className="pb-0.5">{valid ? 'Save' : 'Invalid size'}</div>
            </button>
        </div>
    );
}

// TODO: more then 2000 x 2000 is too much for Chrome
// TODO: show max valid size
// TODO: save user defined size to config
// TODO: show save indicator
// TODO: add animation on popup

function PreciseControlsActions() {
    const [worker] = useAtom(RenderWorkerAtom);
    const [, setAppBackgroundUrl] = useAtom(AppBackgroundUrlAtom);

    function appendNew() {
        worker?.postMessage({ type: 'get-preview', smallWidth: PRESET_W, smallHeight: PRESET_H } as I2W.GetPreview);
    }

    async function setAsBackground(event: React.MouseEvent) {
        if (worker) {
            let blob = await worker.getImage();
            setAppBackgroundUrl(blob);
        }
    }

    // async function saveItemPng(event: React.MouseEvent) {
    //     if (worker) {
    //         let blob = await worker.getImage();
    //         saveBlobData(blob, 'noise-gen.png');
    //     }
    // }

    const [showSelectFileSize, setShowSelectFileSize] = React.useState(false);

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
                title="Set canvas image as application background"
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
                    // onClick={(event) => saveItemPng(event)}
                    onClick={() => setShowSelectFileSize((prev) => !prev)}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.8} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                </div>

                {/* Popup */}
                {showSelectFileSize &&
                    <div className="absolute mt-1 -top-1 right-0">
                        <DimentionsPopup onSave={saveItemPng} />
                    </div>
                }
            </div>
        </div>
    );
}

export default PreciseControlsActions;
