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
        <a.div style={styles} className="rounded-lg ring-2 ring-gray-300 bg-purple-400"
        // onClick={() => {
        //     onNextDigit();
        //     api.start({
        //         to: async (next, cancel) => {
        //             await next({ rotate: styles.rotate.get() === 360 ? 0 : 360, backgroundColor: 'rgb(76, 29, 149)' });
        //             await next({ scale: styles.scale.get() === .7 ? .5 : .7, config: { duration: 400 } });
        //             await next({ scale: 1.1, backgroundColor: 'rgb(167, 139, 250)', config: { duration: 100 } });
        //             await next({ scale: .5, config: { duration: 100 } });
        //         },
        //         config: {
        //             duration: 200,
        //         },
        //         onRest: () => {
        //             //styles.backgroundColor.set('rgb(167, 139, 250)');
        //         }
        //     });
        // }}
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
    const [digit, setDigit] = React.useState(0);

    let dieSize = 64;

    const ANGLES_AXIS = ['X','Y','X','X','Y','Y'];
    const ANGLES = [180, -90, 90, -90, 90, 0]; // k:back l:left t:top b:bottom r:right f:front
    const faceStyle = (idx: number, move: number): string => `rotate${ANGLES_AXIS[idx]}(${ANGLES[idx]}deg) translateZ(${move}px)`;

    let f1k = {
        transform: `rotateX(180deg) translateZ(${dieSize / 2}px)`,
    };
    let f2l = {
        transform: `rotateY(-90deg) translateZ(${dieSize / 2}px)`,
    };
    let f3t = {
        transform: `rotateX(90deg) translateZ(${dieSize / 2}px)`,
    };
    let f4b = {
        transform: `rotateX(-90deg) translateZ(${dieSize / 2}px)`,
    };
    let f5r = {
        transform: `rotateY(90deg) translateZ(${dieSize / 2}px)`,
    };
    let f6f = {
        transform: `rotateY(0deg) translateZ(${dieSize / 2}px)`,
    };

    const [styles, api] = useSpring(() => ({
        num: 0,
        transform: 'rotateX(75deg) rotateY(0deg) rotateZ(45deg)',
        backgroundColor: '',
    }));

    function spin() {
        api.start({
            to: async (next, cancel) => {
                const newNum = styles.num.get() === 1 ? 0 : 1;
                styles.num.set(newNum);
                const angle = 360 * 1;

                //await next({ backgroundColor: 'rgb(76, 29, 149)' });
                await next({
                    transform: `rotateX(${angle}deg) rotateY(${angle}deg) rotateZ(${angle}deg)`, config: {duration: 1000}
                    // transform: `rotateX(720deg) rotateY(720deg) rotateZ(720deg)`
                });
                setDigit(randomIntInclusive(1, 6));
                await next({
                    //transform: 'rotateX(75deg) rotateY(0deg) rotateZ(45deg)'
                    transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                });
                //await next({ backgroundColor: 'rgb(167, 139, 250)', config: { duration: 100 } });

                
            },
            onRest: () => {
                //setDigit(randomIntInclusive(1, 6));
            }
        });
    }

    return (
        <div
            className="scale-50"
            onClick={spin}
        >
            <a.div
                className="mb-4 w-32 h-32 relative"
                style={{
                    transformStyle: 'preserve-3d',
                    //transform: 'rotateX(75deg) rotateY(0deg) rotateZ(45deg)',
                    transformOrigin: 'center center',
                    perspectiveOrigin: '50% 50%',
                    //perspective: '300px',
                    ...styles
                }}
            >
                <div style={{ ...f1k }} className="w-32 h-32 absolute"> <Face digit={(digit + 0) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f2l }} className="w-32 h-32 absolute"> <Face digit={(digit + 1) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f3t }} className="w-32 h-32 absolute"> <Face digit={(digit + 2) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f4b }} className="w-32 h-32 absolute"> <Face digit={(digit + 3) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f5r }} className="w-32 h-32 absolute"> <Face digit={(digit + 4) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f6f }} className="w-32 h-32 absolute"> <Face digit={(digit + 5) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>

                {/* <div style={{ ...f1k }} className="w-32 h-32 absolute"> <Face digit={(digit + 0) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f2l }} className="w-32 h-32 absolute"> <Face digit={(digit + 1) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f3t }} className="w-32 h-32 absolute"> <Face digit={(digit + 2) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f4b }} className="w-32 h-32 absolute"> <Face digit={(digit + 3) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f5r }} className="w-32 h-32 absolute"> <Face digit={(digit + 4) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div>
                <div style={{ ...f6f }} className="w-32 h-32 absolute"> <Face digit={(digit + 5) % 6 + 1} onNextDigit={() => setDigit(randomIntInclusive(1, 6))} /> </div> */}
            </a.div>
        </div>
    );
}

export default TestCubeAnimation;
