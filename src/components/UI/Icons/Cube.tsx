import React, { CSSProperties, HTMLAttributes } from 'react';
import { a, useSpring } from '@react-spring/web';
import { classNames, randomIntInclusive } from '@/utils';
import { PrimitiveAtom, useAtom } from 'jotai';

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
        colorBg = 'rgb(167, 139, 250)',     // bg-purple-400
        colorFace = 'rgb(124, 58, 237)',    // ring-2 ring-purple-600
        colorDots = 'rgb(76, 29, 149)',     // bg-purple-900
    } = cubeProps;
    const border = size * 4 / 100;
    const css = {
        gap: '5%',
        padding: '14%',
        backgroundColor: colorBg,
        '--tw-ring-color': colorFace,
        '--ww': `${border}px`,
        '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(var(--ww) + var(--tw-ring-offset-width)) var(--tw-ring-color)',
        border: `${border}px solid ${colorBorder}`,
        borderRadius: `${border * 4}px`,
        ...style
    } as CSSProperties;

    return (
        <div className="absolute w-full h-full rounded-sm grid grid-cols-3 grid-rows-3 ring-2" style={css}>
            {items.map((on: number, i: number) => (
                <div className="w-full h-full rounded-full" style={{ backgroundColor: on ? colorDots : 'transparent' }} key={i} />
            ))}
        </div>
    );
}

const ANGLES_AXIS = ['X', 'Y', 'X', 'X', 'Y', 'Y'];
const FACE_ANGLES = [180, -90, 90, -90, 90, 0]; // k:back l:left t:top b:bottom r:right f:front
const ROTATIONS_ISO = 'rotateX(75deg) rotateY(0deg) rotateZ(45deg)';
const ROTATIONS_ZERO = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
const faceStyle = (idx: number, move: number): string => `rotate${ANGLES_AXIS[idx]}(${FACE_ANGLES[idx]}deg) translateZ(${move}px)`;

export type CubeProps = {
    colorBorder: string;
    colorBg: string;
    colorFace: string;
    colorDots: string;
    initialIso: boolean;
};

export function Cube({cubeProps, diceAtom, className, ...rest}: { cubeProps: Partial<CubeProps>; diceAtom: PrimitiveAtom<number> } & HTMLAttributes<HTMLDivElement>) {
    const [digit, setDigit] = useAtom(diceAtom);

    const dieSize = 20;

    const [styles, api] = useSpring(() => ({
        transform: cubeProps.initialIso ? ROTATIONS_ISO : ROTATIONS_ZERO,
    }));

    function startSpin() {
        api.start({
            to: async (next, cancel) => {
                await next({ transform: `rotateX(360deg) rotateY(360deg) rotateZ(360deg)`, config: { duration: 1000 } });
                setDigit(randomIntInclusive(1, 6));
                await next({ transform: ROTATIONS_ZERO });
            }
        });
    }

    const dieContainer: CSSProperties = {
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        perspectiveOrigin: '50% 50%',
        width: `${dieSize}px`,
        height: `${dieSize}px`,
        //perspective: '300px',
    }

    return (
        <a.div className={classNames("relative", className)} style={{...dieContainer, ...styles}} onClick={startSpin} {...rest}>
            {FACE_ANGLES.map((_angle: number, idx: number) => (
                <Face
                    digit={(digit + idx) % 6 + 1}
                    size={dieSize}
                    style={{ transform: faceStyle(idx, dieSize / 2) }}
                    cubeProps={cubeProps}
                    key={idx}
                />
            ))}
        </a.div>
    );
}
