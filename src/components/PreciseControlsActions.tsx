import React from 'react';
import { useAtom } from 'jotai';
import { AppBackgroundUrlAtom, ExportImageSizeAtom, RenderWorkerAtom } from '../atoms';
import { I2W, PRESET_H, PRESET_W } from '../utils/types';
import SizeBoxes from './SizeBoxes';
import saveBlobData from '../utils/saveImage';

function DimentionsPopup({ onSave }: { onSave: () => void; }) {
    const [exportImageSize, setExportImageSize] = useAtom(ExportImageSizeAtom);

    const [width, setWidth] = React.useState('' + exportImageSize.w);
    const [height, setHeight] = React.useState('' + exportImageSize.h);
    const [valid, setValid] = React.useState(true);

    // function setNewWidth(value: string) {
    //     let n: number = +value;
    //     let isValid = !isNaN(n) && !!n;
    //     setWidth(value);
    //     setValid(isValid);
    //     if (isValid) {
    //         setExportImageSize((prev) => ({ ...prev, w: n }));
    //     }
    // }

    React.useEffect(() => {
        console.log('popup', width, height);

        function validInt(v: string): number {
            let n = +(+v).toFixed(0);
            return !isNaN(n) && n > 0 ? n : 0;
        }

        let w: number = validInt(width);
        let h: number = validInt(height);
        let isValid = !!w && !!h;
        setValid(isValid);
        if (isValid) {
            setExportImageSize({ w, h });
        }

    }, [width, height]);

    function setNewHeight(value: string) {
    }

    return (
        <div className="px-2 pt-1 rounded border text-sm border-gray-500 bg-purple-300 flex flex-col shadow-lg text-purple-900">
            <div className="">Image size</div>
            <div className="mt-1 flex items-center space-x-1">
                {/* <input className="px-2 py-0.5 w-16 rounded" value={width} onChange={(e) => setNewWidth(e.target.value)} /> */}
                <input className="px-2 py-0.5 w-16 rounded" value={width} onChange={(e) => setWidth(e.target.value)} />
                <div className="">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                {/* <input className="px-2 py-0.5 w-16 rounded" value={exportImageSize.h} onChange={(e) => setNewHeight(e.target.value)} /> */}
                <input className="px-2 py-0.5 w-16 rounded" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <button
                className={
                    `self-end my-2 px-2 py-1 rounded border active-scale 
                    ${valid ? 'bg-purple-500 text-gray-200 border-gray-200' : 'text-red-500 border-none'}`
                }
            >
                <div className="pb-0.5">{valid ? 'Save' : 'Invalid size'}</div>
            </button>
        </div>
    );
}

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

    const showSelectFileSize = React.useState(true);

    async function saveItemPng() {

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
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={.8} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                </div>

                {/* Popup */}
                {showSelectFileSize &&
                    <div className="absolute mt-1 top-full right-0">
                        <DimentionsPopup onSave={saveItemPng} />
                    </div>
                }
            </div>
        </div>
    );
}

export default PreciseControlsActions;
