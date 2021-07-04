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
        <div className={`w-full h-full rounded-full ${on ? 'bg-gray-700' : 'bg-transparent'}`}></div>
    );
}

function CubeFace() {
    const [digit, setDigit] = React.useState(5);

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


    return (
        <div className="p-4 bg-red-400 w-32 h-32 grid grid-cols-3 grid-rows-3 gap-2">
            {items.map((item: React.ReactNode) => item)}
        </div>
    );
}

function TestCubeAnimation() {
    return (
        <div className="mb-4">
            <CubeFace />
        </div>
    );
}

export default TestCubeAnimation;
