import React, { useEffect, useState } from 'react';
import { useDebounce, useHoverDirty, useMeasure } from 'react-use';
import useCanvasWorker from '../hooks/useCanvasWorker';
import DragZone from './DragZone';

export default function Canvas({ seed, color }: { seed: string, color: string; }) {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = useCanvasWorker(canvas);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isHovered = useHoverDirty(containerRef);
    const [dragging, setDragging] = useState(false);
    const [measureRef, { width: widthRow, height: heightRow }] = useMeasure<HTMLDivElement>();

    // const [manualSize, manualSizeSet] = useState<{ w: number; h: number; }>({ w: 350, h: 540 });
    const [manualSize, manualSizeSet] = useState<{ w: number; h: number; }>({ w: 325, h: 300 });
    useEffect(() => {
        widthRow && heightRow && manualSizeSet({ w: widthRow, h: heightRow });
    }, [widthRow, heightRow]);

    useEffect(() => {
        if (worker.current) {
            worker.current.onmessage = (event: MessageEvent) => {
                console.log('from worker2:', event.data);
            };
        }
    }, [worker]);

    useDebounce(() => {
        worker.current?.postMessage({
            type: 'run',
            seed,
            color,
            width: widthRow,
            height: heightRow,
        });
    }, 100, [seed, color, widthRow, heightRow]);

    return (
        <div className={`relative ${dragging ? 'border border-dashed border-gray-600' : ''}`} ref={containerRef}>
            <div
                className="w-full h-full overflow-hidden"
                style={{ resize: 'both', width: `${manualSize.w}px`, height: `${manualSize.h}px` }}
                ref={measureRef}
            >
                <canvas ref={canvas} className="w-full h-full"></canvas>
            </div>
            <DragZone
                className="absolute w-5 h-5 rounded-full border-2 -bottom-2 -right-2 z-10 
                    bg-green-500 border-green-700 active:border-green-600
                    transform active:scale-0"
                size={manualSize} setSize={manualSizeSet} onActivated={(active: boolean) => setDragging(active)}
            />
            {(dragging || isHovered) && <div className="absolute text-[.6rem] text-gray-700">{widthRow} x {heightRow}</div>}
        </div>
    );
}
