import React, { useEffect, useRef, useState } from 'react';
import { useDebounce, useHoverDirty, useMeasure } from 'react-use';
import { useAtom } from 'jotai';
import { ColorCanvasAtom, CreateAppendPresetAtom, InitPreviewsUpdateAtom, ManualSizeAtom, RenderParamsAtom, UpdatePresetPreviewAtom } from '../atoms';
import DragZone from './DragZone';
import { I2W, I4W } from '../utils/types';
import useCanvasWorker from '../hooks/useCanvasWorker';
import { useUpdateAtom } from 'jotai/utils';

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const worker = useCanvasWorker(canvasRef);
    const containerRef = useRef<HTMLDivElement>(null);
    const isHovered = useHoverDirty(containerRef);
    const [dragging, setDragging] = useState(false);
    const [canvasSizeRef, { width: widthRaw, height: heightRaw }] = useMeasure<HTMLDivElement>();
    const [renderParams] = useAtom(RenderParamsAtom);
    const [colorCanvas] = useAtom(ColorCanvasAtom);
    const [, createAppendPreset] = useAtom(CreateAppendPresetAtom);
    const [, updatePresetPreview] = useAtom(UpdatePresetPreviewAtom);
    const initPreviewsUpdate = useUpdateAtom(InitPreviewsUpdateAtom);
   
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
            <div className={`relative ${dragging ? 'border border-dashed border-gray-600' : ''}`} ref={containerRef}>
                {/* Canvas */}
                <div
                    className="w-full h-full overflow-hidden"
                    style={{ resize: 'both', width: `${manualSize.w}px`, height: `${manualSize.h}px` }}
                    ref={canvasSizeRef}
                >
                    <canvas ref={canvasRef} className="w-full h-full" style={{backgroundColor: colorCanvas}}></canvas>
                </div>

                <DragZone
                    className="absolute w-5 h-5 rounded-full border-2 -bottom-2 -right-2 z-10
                        bg-green-500 border-green-700 active:border-green-600
                        transform active:scale-0"
                    size={manualSize} setSize={setManualSize} onActivated={(active: boolean) => setDragging(active)}
                />
                {(dragging || isHovered) && <div className="absolute text-[.6rem] text-gray-700">{widthRaw} x {heightRaw}</div>}
            </div>
        </div>
    );
}
