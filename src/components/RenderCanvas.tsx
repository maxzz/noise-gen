import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useDebounce, useHoverDirty, useMeasure } from 'react-use';
import { renderParamsAtom } from '../atoms';
import useCanvasWorker from '../hooks/useCanvasWorker';
import DragZone from './DragZone';

function encode (input: any) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

export default function Canvas({ seed, color }: { seed: string, color: string; }) {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const worker = useCanvasWorker(canvas);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isHovered = useHoverDirty(containerRef);
    const [dragging, setDragging] = useState(false);
    const [measureRef, { width: widthRow, height: heightRow }] = useMeasure<HTMLDivElement>();
    const [renderParams] = useAtom(renderParamsAtom);

    // const [manualSize, manualSizeSet] = useState<{ w: number; h: number; }>({ w: 350, h: 540 });
    const [manualSize, manualSizeSet] = useState<{ w: number; h: number; }>({ w: 325, h: 300 });
    useEffect(() => {
        widthRow && heightRow && manualSizeSet({ w: widthRow, h: heightRow });
    }, [widthRow, heightRow]);

    useEffect(() => {
        if (worker) {
            worker.onmessage = (event: MessageEvent) => {
                console.log('from worker2:', event.data);
                if (event.data.type === 'render-blob') {
                    let s = 'data:image/png;base64,'+encode(event.data.blob);
                    console.log('img', s);
                }
            };
        }
    }, [worker]);

    useDebounce(() => {
        worker?.postMessage({
            type: 'run',
            seed,
            color,
            width: widthRow,
            height: heightRow,
            params: renderParams,
        });
    }, 100, [seed, color, widthRow, heightRow, renderParams]);

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
