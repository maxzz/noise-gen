import React, { useEffect, useState } from 'react';
import { useDebounce, useHoverDirty, useMeasure } from 'react-use';
import { useAtom } from 'jotai';
import { CreateAppendPresetAtom, ManualSizeAtom, RenderParamsAtom } from '../atoms';
import DragZone from './DragZone';
import { I2W, I4W } from '../utils/types';
import useCanvasWorker from '../hooks/useCanvasWorker';

export default function Canvas() {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = useCanvasWorker(canvas);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isHovered = useHoverDirty(containerRef);
    const [dragging, setDragging] = useState(false);
    const [canvasSizeRef, { width: widthRow, height: heightRow }] = useMeasure<HTMLDivElement>();
    const [renderParams] = useAtom(RenderParamsAtom);
    const [, createAppendPreset] = useAtom(CreateAppendPresetAtom);
   
    // const [manualSize, manualSizeSet] = useState<{ w: number; h: number; }>({ w: 350, h: 540 });
    const [manualSize, setManualSize] = useAtom(ManualSizeAtom);
    useEffect(() => {
        widthRow && heightRow && setManualSize({ w: widthRow, h: heightRow });
    }, [widthRow, heightRow]);

    useEffect(() => {
        if (worker) {
            worker.onmessage = (event: I4W.Message) => {
                if (event.data.type === 'preview-blob') {
                    createAppendPreset(event.data);
                }
            };
        }
    }, [worker]);

    useDebounce(() => {
        worker?.postMessage({
            type: 'run',
            canvasWidth: widthRow,
            canvasHeight: heightRow,
            renderParams
        } as I2W.Run);
    }, 100, [widthRow, heightRow, renderParams]);

    return (
        <div className="w-full h-full flex items-center">
            <div className={`relative ${dragging ? 'border border-dashed border-gray-600' : ''}`} ref={containerRef}>
                {/* Canvas */}
                <div
                    className="w-full h-full overflow-hidden"
                    style={{ resize: 'both', width: `${manualSize.w}px`, height: `${manualSize.h}px` }}
                    ref={canvasSizeRef}
                >
                    <canvas ref={canvas} className="w-full h-full bg-black"></canvas>
                </div>

                <DragZone
                    className="absolute w-5 h-5 rounded-full border-2 -bottom-2 -right-2 z-10
                        bg-green-500 border-green-700 active:border-green-600
                        transform active:scale-0"
                    size={manualSize} setSize={setManualSize} onActivated={(active: boolean) => setDragging(active)}
                />
                {(dragging || isHovered) && <div className="absolute text-[.6rem] text-gray-700">{widthRow} x {heightRow}</div>}
            </div>
        </div>
    );
}
