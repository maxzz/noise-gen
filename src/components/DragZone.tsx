import React, { useEffect, useRef } from 'react';
import useDragZone from '../hooks/useDragZone';

type Size2D = { w: number, h: number; };

function DragZone({ size, setSize }: { size: Size2D, setSize: (v: Size2D) => void; }) {
    const downPt = useRef<{ x: number; y: number; }>();
    const downSz = useRef<{ w: number; h: number; }>();

    const [{ active, clientPt }, setActive] = useDragZone();

    useEffect(() => {
        if (active) {
            const ofs = {
                x: clientPt.x - downPt.current!.x,
                y: clientPt.y - downPt.current!.y,
            };
            console.log('ofs: ', { x: ofs.x, y: ofs.y });
            setSize({
                w: downSz.current!.w + ofs.x,
                h: downSz.current!.h + ofs.y,
            });
        }
    }, [clientPt]);

    return (
        <div
            className="absolute w-8 h-8 rounded-full border-2 border-red-500 -bottom-2 -right-2 z-10"
            style={{ cursor: 'nwse-resize' }}
            onMouseDown={(event) => {
                event.preventDefault();
                downPt.current = { x: event.clientX, y: event.clientY };
                downSz.current = { w: size.w, h: size.h };
                setActive(true);
            }}
            onMouseUp={() => setActive(false)}
        >
        </div>
    );
}

export default DragZone;
