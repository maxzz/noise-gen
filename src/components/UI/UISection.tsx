import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { UISectionPane } from "./UISectionPane";
import { UIAccordion } from "./UIAccordion";
import { classNames } from "@/utils/classnames";

export const textShadow = { textShadow: '1px 1px 2px #000' };

export function UISection({ className, title, children, openAtom }: { className?: string; title: React.ReactNode; children: React.ReactNode; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    return (
        <div>
            <UISectionPane
                className={classNames("pl-4 px-2 py-2 bg-title4 text-stone-100 uppercase rounded flex items-center justify-between select-none cursor-pointer font-ui", className)}
                style={textShadow}
                open={open}
                onClick={() => setOpen(v => !v)}
            >
                {title}
            </UISectionPane>
            <UIAccordion open={open}>
                {children}
            </UIAccordion>
        </div>
    );
}
