import React from 'react';
import Canvas from './components/RenderCanvas';
import PreciseControls from './components/PreciseControls';
import MainControls from './components/MainControls';
//import SortedList from './components/UI/DraggableList/TestSortedList';
import { AppBackground } from './components/UI/AppBackground';
import { Section1_Header } from './components/Section1_Header';
import './App.scss';

export function App() {
    return (
        <AppBackground>
            {/* Header */}
            {Section1_Header()}

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
        </AppBackground>
    );
}
