import { useEffect, useState } from 'react';

export function useDragZone() {
    const [active, setActive] = useState(false);
    const [clientPt, setClientPt] = useState<{ x: number; y: number; }>({ x: 0, y: 0 });

    useEffect(() => {
        if (active) {
            function onMove(ev: MouseEvent) {
                setClientPt({ x: ev.clientX, y: ev.clientY, });
            }
            function onDone() {
                setActive(false);
                document.removeEventListener('mouseup', onDone);
            }
            document.addEventListener('mousemove', onMove, false);
            document.addEventListener('mouseup', onDone, false);
            return () => {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onDone);
            };
        }
    }, [active]);

    return [{ active, clientPt }, setActive] as const;
}
