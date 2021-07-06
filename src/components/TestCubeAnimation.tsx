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

    // const [styles, api] = useSpring(() => ({
    //     //scale: .5,
    // }));

    return (
        <a.div style={styles} className="rounded-lg ring-2 ring-gray-300 bg-purple-400 scale-50">
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

    const ANGLES_AXIS = ['X', 'Y', 'X', 'X', 'Y', 'Y'];
    const ANGLES = [180, -90, 90, -90, 90, 0]; // k:back l:left t:top b:bottom r:right f:front
    const faceStyle = (idx: number, move: number): string => `rotate${ANGLES_AXIS[idx]}(${ANGLES[idx]}deg) translateZ(${move}px)`;

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
                    transform: `rotateX(${angle}deg) rotateY(${angle}deg) rotateZ(${angle}deg)`, config: { duration: 1000 }
                    // transform: `rotateX(720deg) rotateY(720deg) rotateZ(720deg)`, config: { duration: 1000 }
                });
                setDigit(randomIntInclusive(1, 6));
                await next({
                    //transform: 'rotateX(75deg) rotateY(0deg) rotateZ(45deg)'
                    transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                });
                //await next({ backgroundColor: 'rgb(167, 139, 250)', config: { duration: 100 } });
            }
        });
    }

    return (
        <div className="scale-50" onClick={spin}>
            <a.div
                className="mb-4 w-32 h-32 relative"
                style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                    perspectiveOrigin: '50% 50%',
                    //perspective: '300px',
                    ...styles
                }}
            >
                {ANGLES.map((_angle: number, idx: number) => (
                    <div style={{ transform: faceStyle(idx, dieSize / 2) }} className="w-32 h-32 absolute" key={idx}>
                        <Face digit={(digit + idx) % 6 + 1} />
                    </div>
                ))}
            </a.div>
        </div>
    );
}

export default TestCubeAnimation;
