import React, { HTMLAttributes } from 'react';
import { useAtom } from 'jotai';
import { AppBackgroundActiveAtom, AppBackgroundUrlAtom } from './store';
import Canvas from './components/RenderCanvas';
import PreciseControls from './components/PreciseControls';
import MainControls from './components/MainControls';
//import SortedList from './components/UI/DraggableList/TestSortedList';
import './App.scss';
import { Section1_Header } from './components/Section1_Header';

function AppBackground({ children }: HTMLAttributes<HTMLDivElement>) {
    const [appBackgroundUrl, setAppBackgroundUrl] = useAtom(AppBackgroundUrlAtom);
    const [appBackgroundActive] = useAtom(AppBackgroundActiveAtom);
    return (
        <div
            className="App h-screen flex flex-col items-center space-y-4 bg-purple-200 color-vars"
            // style={{background: `radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`}}
            // style={{backgroundImage: `url(${bkgImage}), radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`, backgroundBlendMode: 'multiply, screen, color-dodge'}}
            style={
                appBackgroundActive
                    ? {
                        backgroundImage: `url(${appBackgroundUrl}), radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`,
                        backgroundBlendMode: 'multiply, screen, color-dodge',
                    } : {
                        backgroundImage: `radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`,
                    }
            }
        >
            {children}
        </div>
    );
}

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
