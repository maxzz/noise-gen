import React from 'react';
import { AppBackground } from './components/UI/AppBackground';
import { Section1_Header } from './components/Section1_Header';
import { MainControls } from './components/MainControls';
import { PreciseControls } from './components/PreciseControls';
import { Canvas } from './components/RenderCanvas';
//import SortedList from './components/UI/DraggableList/TestSortedList';
import './App.scss';

export function App() {
    return (
        <AppBackground>
            <Section1_Header />

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
