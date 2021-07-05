import { a, useSpring } from '@react-spring/web';
import React from 'react';
import { randomIntInclusive } from '../utils/numbers';

const FACES = [
    [4],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8],
];

function Face({ digit, onNextDigit }: { digit: number; onNextDigit: () => void; }) {
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
                onNextDigit();
                api.start({
                    to: async (next, cancel) => {
                        await next({ rotate: styles.rotate.get() === 360 ? 0 : 360, backgroundColor: 'rgb(76, 29, 149)' });
                        await next({ scale: styles.scale.get() === .7 ? .5 : .7, config: { duration: 400 } });
                        await next({ scale: 1.1, backgroundColor: 'rgb(167, 139, 250)', config: { duration: 100 } });
                        await next({ scale: .5, config: { duration: 100 } });
                    },
                    config: {
                        duration: 200,
                    },
                    onRest: () => {
                        //styles.backgroundColor.set('rgb(167, 139, 250)');
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
    const [digit, setDigit] = React.useState(5);

    let dieSize = 10;

    let f1Style = {
        transform: `rotateX(180deg) translateZ(${dieSize / 2}px)`,
    };
    let f2Style = {
        transform: `rotateY(-90deg) translateZ(${dieSize / 2}px)`,
    };
    let f3Style = {
        transform: `rotateX(90deg) translateZ(${dieSize / 2}px)`,
    };
    let f4Style = {
        transform: `rotateX(-90deg) translateZ(${dieSize / 2}px)`,
    };
    let f5Style = {
        transform: `rotateY(90deg) translateZ(${dieSize / 2}px)`,
    };
    let f6Style = {
        transform: `rotateY(0deg) translateZ(${dieSize / 2}px)`,
    };

    return (
        <div className="mb-4" style={{transformStyle: 'preserve-3d'}}>
            <div style={{...f1Style}} className="w-32 h-32"> <Face digit={digit} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
            <div style={{...f2Style}} className="w-32 h-32"> <Face digit={digit} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
            <div style={{...f3Style}} className="w-32 h-32"> <Face digit={digit} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
            <div style={{...f4Style}} className="w-32 h-32"> <Face digit={digit} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
            <div style={{...f5Style}} className="w-32 h-32"> <Face digit={digit} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
            <div style={{...f6Style}} className="w-32 h-32"> <Face digit={digit} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
        </div>
    );
}

export default TestCubeAnimation;
