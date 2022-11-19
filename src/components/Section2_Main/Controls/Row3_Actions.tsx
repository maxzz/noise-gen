import React, { HTMLAttributes } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useSpring, a, easings } from '@react-spring/web';
import { useKey } from 'react-use';
import { AppBackgroundUrlAtom, RenderWorkerAtom } from '@/store';
import { I2W, PRESET_H, PRESET_W, WH } from '@/store/types';
import { Row3_SizeBoxes } from './Row3_SizeBoxes';
import { Row3_PopupImageSize } from './Row3_PopupImageSize';
import { saveBlobData } from '@/utils/saveImage';
import { IconGridAdd, IconMountains, IconSave } from '@/components/UI/Icons';
import { classNames } from '@/utils';

function Frame({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={classNames(
                "px-1 flex-centered text-gray-500 border-gray-400 bg-gray-50 hover:bg-white border rounded space-x-1",
                className
            )}
            style={{ boxShadow: '#00000014 1px 1px 0px 0px' }}
            {...rest}
        >
            {children}
        </div>
    );
}

function Button({ className, children, ...rest }: HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={classNames(
                "flex-centered text-gray-500 border-gray-400 bg-gray-50 hover:bg-white border rounded transform active-scale cursor-pointer",
                className
            )}
            style={{ boxShadow: '#00000014 1px 1px 0px 0px' }}
            {...rest}
        >
            {children}
        </button>
    );
}

export function Row3_Actions() {
    const worker = useAtomValue(RenderWorkerAtom);
    const latestWorker = React.useRef(worker);
    latestWorker.current = worker;

    const setAppBackgroundUrl = useSetAtom(AppBackgroundUrlAtom);
    const [showSelectFileSize, setShowSelectFileSize] = React.useState(false);

    const popupStyles = useSpring({
        opacity: showSelectFileSize ? 1 : 0,
        scale: showSelectFileSize ? 1 : 0,
        transformOrigin: 'top right',
        config: {
            duration: 200,
            easing: easings.easeOutCirc,
        }
    });

    useKey('F2', (event) => {
        if (event.altKey) {
            setAppBackgroundUrl(null);
        } else {
            setAsBackground();
        }
    });

    function appendNew() {
        worker?.postMessage({ type: 'get-preview', smallWidth: PRESET_W, smallHeight: PRESET_H } as I2W.GetPreview);
    }

    async function setAsBackground() {
        if (latestWorker.current) {
            let blob = await latestWorker.current.getImage();
            setAppBackgroundUrl(blob);
        }
    }

    async function saveItemPng(size?: WH) {
        setShowSelectFileSize(false);
        if (size && worker) {
            let blob = await worker.getImage(size);
            saveBlobData(blob, 'noise-gen.png');
        }
    }

    return (
        <div className="p-2 flex space-x-1">

            {/* Canvas size buttons */}
            <Frame>
                <Row3_SizeBoxes />
            </Frame>

            {/* Preset set as background */}
            <Button className="w-8 h-8" title="Set canvas image as application background (F2)" onClick={setAsBackground}>
                {IconMountains({ className: "w-8 h-6 stroke-[.8]" })}
            </Button>

            {/* Preset add */}
            <Button className="flex-1 w-8 h-8" title="Save preset" onClick={appendNew}>
                {IconGridAdd({ className: "w-6 h-6 stroke-[.8]" })}
            </Button>

            {/* Image save */}
            <div className="relative z-10">
                {/* Save button */}
                <Button className="w-8 h-8" title="Save image" onClick={() => setShowSelectFileSize((prev) => !prev)}>
                    {IconSave({ className: "w-6 h-6 stroke-[.8]" })}
                </Button>
                {/* Popup */}
                {showSelectFileSize &&
                    <a.div style={popupStyles} className="absolute mt-1 -top-1 right-0">
                        <Row3_PopupImageSize onClickedSave={saveItemPng} />
                    </a.div>
                }
            </div>

        </div>
    );
}
