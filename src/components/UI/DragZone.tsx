import React, { useEffect, useRef } from 'react';
import useDragZone from '../../hooks/useDragZone';

type Size2D = { w: number, h: number; };

export type DragZoneProps = {
    size: Size2D;
    setSize: (v: Size2D) => void;
    onActivated?: (v: boolean) => void;
} & React.HTMLAttributes<Element>;

function DragZone({ size, setSize, onActivated = () => { }, ...rest }: DragZoneProps) {
    const downPt = useRef<{ x: number; y: number; }>();
    const downSz = useRef<{ w: number; h: number; }>();

    const [{ active, clientPt }, setActive] = useDragZone();

    useEffect(() => {
        if (active) {
            setSize({
                w: downSz.current!.w + (clientPt.x - downPt.current!.x),
                h: downSz.current!.h + (clientPt.y - downPt.current!.y)
            });
        }
    }, [clientPt]);

    useEffect(() => onActivated(active), [active]);

    return (
        <div
            {...rest}
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
