import React from "react";
import { Cube } from "./Cube";

const cubeProps = {
    initialIso: true,
    colorFace: "var(--purple-900)",
    colorBorder: "var(--purple-200)",
    colorBg: "var(--purple-300)",
    colorDots: "var(--purple-900)",
};

export function GameOfDice() {
    return (
        <div className="flex items-center space-x-2">
            <div className="">
                {Cube({ cubeProps })}
            </div>
            <div className="rotate-12">
                {Cube({ cubeProps })}
            </div>
        </div>
    );
}
