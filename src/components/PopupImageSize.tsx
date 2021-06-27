import { useAtom } from 'jotai';
import React from 'react';
import { useClickAway } from 'react-use';
import { ExportImageSizeAtom } from '../atoms';
import { WH } from '../utils/types';

function PopupImageSize({ onSave }: { onSave: (size?: WH) => void; }) {
    const [exportImageSize, setExportImageSize] = useAtom(ExportImageSizeAtom);
    const [width, setWidth] = React.useState('' + exportImageSize.w);
    const [height, setHeight] = React.useState('' + exportImageSize.h);
    const [valid, setValid] = React.useState(true);
    const [tooBig, setTooBig] = React.useState(false);
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
        let isTooBig = w * h > 2000 * 2000;
        let isValid = !!w && !!h && !isTooBig;
        setValid(isValid);
        setTooBig(isTooBig);
        isValid && setExportImageSize({ w, h });
    }, [width, height]);

    return (
        // Popup frame
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
                    `self-end mt-2 mb-2 px-3 py-1 h-8 rounded border active-scale 
                    ${valid ? 'bg-purple-500 text-gray-200 border-gray-200' : 'text-red-600 border-none'}`
                }
                onClick={() => valid && onSave(exportImageSize)}
            >
                <div className="pb-0.5">{valid ? 'Save' : tooBig ? 'Max is 2000 x 2000' : 'Invalid size'}</div>
            </button>
        </div>
    );
}

export default PopupImageSize;

// TODO: more then 2000 x 2000 is too much for Chrome
// TODO: show max valid size
// TODO: save user defined size to config
// TODO: show save indicator
// TODO: add animation on popup
