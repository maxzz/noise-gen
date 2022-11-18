import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useSpring, a } from '@react-spring/web';
import { useKey } from 'react-use';
import { AppBackgroundUrlAtom, RenderWorkerAtom } from '@/store';
import { I2W, PRESET_H, PRESET_W, WH } from '@/store/types';
import { Row3_SizeBoxes } from './Row3_SizeBoxes';
import { Row3_PopupImageSize } from './Row3_PopupImageSize';
import { saveBlobData } from '@/utils/saveImage';
import { IconGridAdd, IconMountains, IconSave } from '@/components/UI/Icons';

export function Row3_Actions() {
    const worker = useAtomValue(RenderWorkerAtom);
    const latestWorker = React.useRef(worker);
    latestWorker.current = worker;

    const setAppBackgroundUrl = useSetAtom(AppBackgroundUrlAtom);
    const [showSelectFileSize, setShowSelectFileSize] = React.useState(false);

    const styles = useSpring({
        opacity: showSelectFileSize ? 1 : 0,
        config: {
            duration: 100
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
            <div
                className="px-1 flex-centered space-x-1 border rounded border-gray-400 bg-gray-50 hover:bg-white"
                style={{ boxShadow: '#00000014 1px 1px 0px 0px' }}
            >
                <Row3_SizeBoxes />
            </div>

            {/* Preset set as background */}
            <div
                className="flex-centered 
                text-gray-500
                border rounded border-gray-400 bg-gray-50 hover:bg-white
                transform active-scale cursor-pointer"
                style={{ boxShadow: '#00000014 1px 1px 0px 0px' }}
                title="Set canvas image as application background (F2)"
                onClick={setAsBackground}
            >
                <IconMountains className="w-8 h-6 stroke-[.8]" />
            </div>

            {/* Preset add */}
            <div
                className="flex-1 w-8 h-8 flex-centered 
                text-gray-500
                border rounded border-gray-400 bg-gray-50 hover:bg-white
                transform active-scale cursor-pointer"
                style={{ boxShadow: '#00000014 1px 1px 0px 0px' }}
                title="Save preset"
                onClick={appendNew}
            >
                <IconGridAdd className="w-6 h-6 stroke-[.8]" />
            </div>

            {/* Image save */}
            <div className="relative z-10">
                {/* Save button */}
                <div
                    className="flex-1 w-8 h-8 flex-centered 
                    text-gray-500
                    border rounded border-gray-400 bg-gray-50 hover:bg-white
                    active-scale cursor-pointer"
                    style={{ boxShadow: '#00000014 1px 1px 0px 0px' }}
                    title="Save image"
                    onClick={() => setShowSelectFileSize((prev) => !prev)}
                >
                    <IconSave className="w-6 h-6 stroke-[.8]" />
                </div>
                {/* Popup */}
                {showSelectFileSize &&
                    <a.div style={styles} className="absolute mt-1 -top-1 right-0">
                        <Row3_PopupImageSize onSave={saveItemPng} />
                    </a.div>
                }
            </div>
        </div>
    );
}
