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
                "flex-centered text-app-800 bg-app-300/50 hover:text-app-50 hover:bg-app-400 border-app-500 border rounded shadow group transition-colors",
                "px-1 space-x-1", className,
            )}
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
                "flex-centered text-app-800 bg-app-300/50 hover:text-app-50 hover:bg-app-400 border-app-500 border rounded shadow group transition-colors",
                "active-scale cursor-pointer", className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
}

function ButtonImageSave({ onClickBtnSave }: { onClickBtnSave: (size?: any) => void; }) {
    const [showSelectFileSize, setShowSelectFileSize] = React.useState(false);
    const popupStyles = useSpring({
        opacity: showSelectFileSize ? 1 : 0,
        scale: showSelectFileSize ? 1 : 0,
        config: {
            duration: 200,
            easing: easings.easeOutCirc,
        }
    });
    return (
        <div className="relative z-10">
            <Button className="w-8 h-8" title="Save image" onClick={() => setShowSelectFileSize((prev) => !prev)}>
                {IconSave({ className: "p-0.5 w-6 h-6 stroke-[.8] group-hover:stroke-[1.6]" })}
            </Button>

            {/* Popup */}
            {showSelectFileSize &&
                <a.div style={popupStyles} className="absolute mt-1 -top-1 right-0 origin-top-right">
                    <Row3_PopupImageSize onClickedSave={(size?: any) => {
                        setShowSelectFileSize(false);
                        onClickBtnSave(size);
                    }} />
                </a.div>
            }
        </div>
    );
}

export function Row3_Actions() {
    const worker = useAtomValue(RenderWorkerAtom);
    const latestWorker = React.useRef(worker);
    latestWorker.current = worker;

    const setAppBackgroundUrl = useSetAtom(AppBackgroundUrlAtom);

    useKey('F2', (event) => {
        if (event.altKey) {
            setAppBackgroundUrl(null);
        } else {
            setAsBackground();
        }
    });

    function postAppendNewPreset() {
        worker?.postMessage({ type: 'get-preview', smallWidth: PRESET_W, smallHeight: PRESET_H } as I2W.GetPreview);
    }

    async function setAsBackground() {
        if (latestWorker.current) {
            let blob = await latestWorker.current.getImage();
            setAppBackgroundUrl(blob);
        }
    }

    async function saveItemPng(size?: WH) {
        if (size && worker) {
            let blob = await worker.getImage(size);
            saveBlobData(blob, 'noise-gen.png');
        }
    }

    return (
        <div className="p-2 flex space-x-1">
            {/* Canvas size buttons */}
            <Frame className="hover:bg-app-300/50">
                <Row3_SizeBoxes />
            </Frame>

            {/* Preset set as background */}
            <Button className="w-8 h-8" title="Set canvas image as app background (F2 / Alt+F2 clear)" onClick={setAsBackground}>
                {IconMountains({ className: "w-8 h-6 stroke-[.7] group-hover:stroke-[1.35]" })}
            </Button>

            {/* Preset add */}
            <Button className="flex-1 w-8 h-8" title="Save preset" onClick={postAppendNewPreset}>
                {IconGridAdd({ className: "w-6 h-6 stroke-[.8] group-hover:stroke-[1.4]" })}
            </Button>

            {/* Image save */}
            <ButtonImageSave onClickBtnSave={saveItemPng} />
        </div>
    );
}
