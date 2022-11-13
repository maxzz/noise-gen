import React, { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { AppBackgroundActiveAtom, AppBackgroundUrlAtom } from "../../store";

export function AppBackground({ children }: HTMLAttributes<HTMLDivElement>) {
    const appBackgroundUrl = useAtomValue(AppBackgroundUrlAtom);
    const appBackgroundActive = useAtomValue(AppBackgroundActiveAtom);
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
                    }
                    : {
                        backgroundImage: `radial-gradient(circle, #d5ccf7 0%, #ab9dde 100%)`,
                    }
            }
        >
            {children}
        </div>
    );
}
