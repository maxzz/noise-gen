import { a, useSpring } from '@react-spring/web';
import React from 'react';

const FACES = [
    [4],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8],
];

function Face({ digit }: { digit: number; }) {
    const items = React.useMemo(() => {
        let items = [];
        let faces = FACES[digit - 1];

        if (faces) {
            for (let i = 0; i < 9; i++) {
                items.push(faces.includes(i) ? 1 : 0);
            }
        }

        return items;
    }, [digit]);

    const [styles, api] = useSpring(() => ({
        rotate: 0,
        scale: .5,
        backgroundColor: 'rgb(167, 139, 250)', 
    }));

    return (
        <a.div style={styles} className="rounded-lg border-2 bg-purple-400"
            onClick={() => {
                api.start({
                    to: async (next, cancel) => {
                        await next({ rotate: styles.rotate.get() === 360 ? 0 : 360, backgroundColor: 'rgb(76, 29, 149)' });
                        await next({ scale: styles.scale.get() === .7 ? .5 : .7 });
                        await next({ scale: 1.1 });
                    },
                    onRest: () => {
                        styles.backgroundColor.set('rgb(167, 139, 250)');
                    }
                });
            }}
        >
            <a.div className="p-4 w-32 h-32 grid grid-cols-3 grid-rows-3 gap-2">
                {items.map((on: number, i: number) => (
                    <div className={`w-full h-full rounded-full ${on ? 'bg-purple-900' : 'bg-transparent'}`} key={i} />
                ))}
            </a.div>
        </a.div>
    );
}

function TestCubeAnimation() {
    return (
        <div className="mb-4">
            <Face digit={5} />
        </div>
    );
}

export default TestCubeAnimation;
