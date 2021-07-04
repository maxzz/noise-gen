import React from 'react';

const FACES = [
    [0],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8],
];

function Dot() {
    
}

function CubeFace() {
    const [digit, setDigit] = React.useState(0);
    return (
        <div className="p-4 bg-red-400 w-32 h-32 grid grid-cols-3 grid-rows-3 gap-2">
            <div className="w-full h-full rounded-full bg-gray-700"></div>
            <div className="w-full h-full rounded-full bg-transparent"></div>
            <div className="w-full h-full rounded-full bg-gray-700"></div>

            <div className="w-full h-full rounded-full bg-gray-700"></div>
            <div className="w-full h-full rounded-full bg-gray-700"></div>
            <div className="w-full h-full rounded-full bg-gray-700"></div>

            <div className="w-full h-full rounded-full bg-gray-700"></div>
            <div className="w-full h-full rounded-full bg-transparent"></div>
            <div className="w-full h-full rounded-full bg-gray-700"></div>
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
