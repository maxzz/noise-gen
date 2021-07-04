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

function Dot({ on }: { on: boolean; }) {
    return (
        <div className={`w-full h-full rounded-full ${on ? 'bg-purple-900' : 'bg-transparent'}`}></div>
    );
}

function Face({digit}: {digit: number}) {
    const items = React.useMemo(() => {
        let items = [];
        let faces = FACES[digit - 1];

        if (faces) {
            for (let i = 0; i < 9; i++) {
                items.push(<Dot on={faces.includes(i)} key={i} />);
            }
        }

        return items;
    }, [digit]);

    const styles = useSpring({
        rotate: 45,
    });

    return (
        <div className="p-4 w-32 h-32 grid grid-cols-3 grid-rows-3 gap-2 rounded-lg border-2 bg-purple-400 scale-50">
            {items.map((item: React.ReactNode, idx: number) => (
                <a.div style={styles} key={idx}>
                    {item}
                </a.div>
            ))}
        </div>
    );
}

function TestCubeAnimation() {
    return (
        <div className="mb-4">
            <Face digit={5}/>
        </div>
    );
}

export default TestCubeAnimation;
