import { atom } from "jotai";
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
    const [digitAtom1] = React.useState(atom(0));
    const [digitAtom2] = React.useState(atom(0));
    return (
        <div className="flex items-center space-x-2">
            <div className="">
                {Cube({ cubeProps, diceAtom: digitAtom1 })}
            </div>
            <div className="rotate-12">
                {Cube({ cubeProps, diceAtom: digitAtom2 })}
            </div>
        </div>
    );
}
