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

function Face({ digit, size, style = {}, cubeProps }: { digit: number; size: number; cubeProps: Partial<CubeProps>; style: React.CSSProperties; }) {
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
    const {
        colorBorder = 'rgb(155, 108, 230)', // rgb(155, 108, 230) rgb(209, 213, 219) rgb(76, 29, 149)
        colorBg = 'rgb(167, 139, 250)',
        colorFace = 'rgb(124, 58, 237)',
        colorDots = 'rgb(76, 29, 149)',
    } = cubeProps; // ; bg-purple-400; ring-2 ring-purple-600
    const border = size * 4 / 100;
    return (
        <div
            className="absolute w-full h-full rounded-sm grid grid-cols-3 grid-rows-3 ring-2"
            style={{
                gap: '5%',
                padding: '14%',
                backgroundColor: colorBg,
                '--tw-ring-color': colorFace,
                '--ww': `${border}px`,
                '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(var(--ww) + var(--tw-ring-offset-width)) var(--tw-ring-color)',
                border: `${border}px solid ${colorBorder}`,
                borderRadius: `${border * 4}px`,
                ...style
            } as React.CSSProperties}
        >
            <div className="absolute text-red-500">{digit}</div>

            {items.map((on: number, i: number) => (
                // <div className={`w-full h-full rounded-full ${on ? 'bg-purple-900' : 'bg-transparent'}`} key={i} />
                <div className="w-full h-full rounded-full" style={{backgroundColor: (on ? colorDots : 'bg-transparent')}} key={i} />
            ))}
        </div>
    );
}

const ANGLES_AXIS = ['X', 'Y', 'X', 'X', 'Y', 'Y'];
const ANGLES = [180, -90, 90, -90, 90, 0]; // k:back l:left t:top b:bottom r:right f:front
const faceStyle = (idx: number, move: number): string => `rotate${ANGLES_AXIS[idx]}(${ANGLES[idx]}deg) translateZ(${move}px)`;
const ANGLE_ISO = 'rotateX(75deg) rotateY(0deg) rotateZ(45deg)';
const ANGLE_ZERO = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';

type CubeProps = {
    colorBorder: string;
    colorBg: string;
    colorFace: string;
    colorDots: string;
    initialIso: boolean;
};

function TestCubeAnimation(cubeProps: Partial<CubeProps> = {}) {
    const [digit, setDigit] = React.useState(0);

    let dieSize = 24;

    const [styles, api] = useSpring(() => ({
        transform: cubeProps.initialIso ? ANGLE_ISO : ANGLE_ZERO,
    }));

    function spin() {
        api.start({
            to: async (next, cancel) => {
                await next({ transform: `rotateX(360deg) rotateY(360deg) rotateZ(360deg)`, config: { duration: 1000 } });
                setDigit(randomIntInclusive(1, 6));
                await next({ transform: ANGLE_ZERO });
            }
        });
    }

    return (
        <a.div
            className="relative"
            style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                perspectiveOrigin: '50% 50%',
                width: `${dieSize}px`,
                height: `${dieSize}px`,
                //perspective: '300px',
                ...styles
            }}
            onClick={spin}
        >
            {ANGLES.map((_angle: number, idx: number) => (
                <Face digit={(digit + idx) % 6 + 1} size={dieSize} style={{ transform: faceStyle(idx, dieSize / 2) }} key={idx} cubeProps={cubeProps} />
            ))}
        </a.div>
    );
}

export default TestCubeAnimation;
