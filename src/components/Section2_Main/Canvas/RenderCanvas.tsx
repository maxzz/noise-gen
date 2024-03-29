import React, { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useDebounce, useHoverDirty, useMeasure } from 'react-use';
import { ColorCanvasAtom, CreateAppendPresetAtom, InitPreviewsUpdateAtom, ManualSizeAtom, RenderParamsAtom, UpdatePresetPreviewAtom } from '@/store';
import { I2W, I4W } from '@/store/types';
import { ResizingZone } from '@/components/Section2_Main/Canvas/ResizingZone';
import { useCanvasWorker } from '@/components/Section2_Main/Canvas/useCanvasWorker';
import { classNames } from '@/utils';

export function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const worker = useCanvasWorker(canvasRef);
    const containerRef = useRef<HTMLDivElement>(null);
    const isHovered = useHoverDirty(containerRef);
    const [dragging, setDragging] = useState(false);
    const [canvasSizeRef, { width: widthRaw, height: heightRaw }] = useMeasure<HTMLDivElement>();
    const renderParams = useAtomValue(RenderParamsAtom);
    const colorCanvas = useAtomValue(ColorCanvasAtom);
    const createAppendPreset = useSetAtom(CreateAppendPresetAtom);
    const updatePresetPreview = useSetAtom(UpdatePresetPreviewAtom);
    const initPreviewsUpdate = useSetAtom(InitPreviewsUpdateAtom);

    const [manualSize, setManualSize] = useAtom(ManualSizeAtom);
    useEffect(() => {
        widthRaw && heightRaw && setManualSize({ w: widthRaw, h: heightRaw });
    }, [widthRaw, heightRaw]);

    useEffect(() => {
        if (worker) {
            worker.onmessage = (event: I4W.Message) => {
                switch (event.data.type) {
                    case 'preview-blob': {
                        createAppendPreset(event.data);
                        break;
                    }
                    case 'preview-blob-id': {
                        updatePresetPreview(event.data);
                        break;
                    }
                }
            };
            initPreviewsUpdate();
        }
    }, [worker]);

    useDebounce(() => {
        worker?.postMessage({
            type: 'run',
            canvasWidth: widthRaw,
            canvasHeight: heightRaw,
            renderParams
        } as I2W.Run);
    }, 100, [widthRaw, heightRaw, renderParams]);

    return (
        <div className="w-full h-full flex items-center">
            <div className={classNames("relative border", dragging ? 'border-dashed border-primary-600' : 'border-transparent')} ref={containerRef}>
                {/* Canvas */}
                <div
                    className="w-full h-full overflow-hidden"
                    style={{ resize: 'both', width: `${manualSize.w}px`, height: `${manualSize.h}px` }}
                    ref={canvasSizeRef}
                >
                    <canvas ref={canvasRef} className="w-full h-full" style={{ backgroundColor: colorCanvas }}></canvas>
                </div>

                <ResizingZone
                    className="absolute w-5 h-5 rounded-full border-2 -bottom-2 -right-2 z-10
                        bg-green-500 border-green-700 active:border-green-600 active:scale-0"
                    size={manualSize}
                    setSize={setManualSize}
                    onActivated={(active: boolean) => setDragging(active)}
                />

                {(dragging || isHovered) &&
                    <div className="absolute text-[.6rem] text-gray-700">
                        {widthRaw} x {heightRaw}
                    </div>
                }
            </div>
        </div>
    );
}
