import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { UISectionPane } from "./UISectionPane";
import { UIAccordion } from "./UIAccordion";
import { classNames } from "@/utils/classnames";

export function UISection({ className, title, children, openAtom }: { className?: string; title: React.ReactNode; children: React.ReactNode; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    return (
        <div>
            <UISectionPane
                className={classNames("px-2 text-xs font-bold uppercase text-app-900/80 rounded select-none cursor-pointer flex items-center", className)}
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
