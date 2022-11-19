import React from 'react';
import { useAtom } from 'jotai';
import { useClickAway } from 'react-use';
import { ExportImageSizeAtom } from '@/store';
import { WH } from '@/store/types';
import { bytesToSize, classNames } from '@/utils';
import { IconCross } from '@/components/UI/Icons';

function validInt(v: string): number {
    const n = +(+v).toFixed(0);
    return !isNaN(n) && n > 0 ? n : 0;
}

function getNotices(valid: boolean, tooBig: boolean, size: WH) {
    const forTitle = tooBig
        ? sizeTooBigMessage(size)
        : valid
            ? `The current size is ${sizeInMB(size)} (uncompressed in pixels).`
            : 'The numbers are not valid.';
    const forButton = valid ? 'Save' : tooBig ? 'Max is 2000 x 2000' : 'Invalid size';
    return {
        forTitle,
        forButton,
    };

    function sizeInMB(size: WH): string {
        return bytesToSize(size.w * size.h, 2);
    }

    function sizeTooBigMessage(size: WH) {
        return `Sizes over 2000 x 2000 are already a bit too much for Chrome.
    The current image size ${size.w} x ${size.h} = ${sizeInMB(size)} (uncompressed in pixels).`;
    }
}

export function Row3_PopupImageSize({ onClickedSave: onSave }: { onClickedSave: (size?: WH) => void; }) {
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
        let w = validInt(width);
        let h = validInt(height);

        let isValid = !!w && !!h;
        let isTooBig = isValid && w * h > 2000 * 2000;
        isValid = isValid && !isTooBig;

        setValid(isValid);
        setTooBig(isTooBig);
        isValid && setExportImageSize({ w, h });
    }, [width, height]);

    const notices = getNotices(valid, tooBig, { w: +width, h: +height });

    return (
        // Popup frame
        <div
            className="px-4 pt-1 relative rounded border text-sm border-gray-100 bg-app-400 flex flex-col shadow-lg text-purple-900"
            onKeyDown={((event) => event.key === 'Escape' && onSave())}
            ref={containerRef}
        >
            {/* Close button */}
            <div
                className="absolute top-[2px] right-[2px] p-1.5 rounded activ:bg-red-100 hover:bg-red-400 hover:text-white"
                onClick={() => onSave()}
            >
                {IconCross({ className: "h-4 w-4 stroke-2" })}
            </div>

            {/* Controls */}
            <div className="mt-4">Image size in pixels</div>
            <div className="mt-1 flex items-center space-x-1">
                <input
                    ref={firstInputRef}
                    className="px-2 py-1 w-16 rounded border border-gray-500"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    onKeyDown={((event) => valid && event.key === 'Enter' && onSave(exportImageSize))}
                />

                {IconCross({ className: "h-4 w-4 stroke-2" })}

                <input
                    className="px-2 py-1 w-16 rounded border border-gray-500"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    onKeyDown={((event) => valid && event.key === 'Enter' && onSave(exportImageSize))}
                />
            </div>

            {/* Save button */}
            <button
                className={classNames(
                    "self-end mt-4 mb-4 px-4 py-1 h-8 rounded border active-scale",
                    valid ? 'bg-app-500 text-gray-200 border-gray-500' : 'text-red-600 border-none'
                )}
                title={notices.forTitle}
                onClick={() => valid && onSave(exportImageSize)}
            >
                <div className="pb-0.5">
                    {notices.forButton}
                </div>
            </button>
        </div>
    );
}
