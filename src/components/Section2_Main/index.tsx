import React from 'react';
import { MainControls } from './MainControls';
import { PreciseControls } from './PreciseControls';
import { Canvas } from './RenderCanvas';
//import SortedList from '@/components/UI/DraggableList/TestSortedList';

export function Section2_Main() {
    return (
        <div className="relative max-w-md w-full flex-1 flex flex-col items-center">
            {/* <div className="">
                <SortedList />
            </div> */}

            {/* Controls */}
            <div className="w-full flex flex-col space-y-1">
                <MainControls />
                <PreciseControls />
            </div>

            {/* Canvas */}
            <div className="flex-1 mt-1">
                <Canvas />
            </div>
        </div>
    );
}
