import React from 'react';
import { HTMLAttributes } from 'react';
import { UIArrow } from './UIArrow';

export function UISectionPane({ className, children, open = true, ...rest }: { open?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={className || "px-2 py-1 bg-slate-500 text-stone-100 uppercase flex items-center justify-between select-none cursor-pointer font-ui"}
            {...rest}
        >
            {/* Section name */}
            {children}
            
            {/* Open/Close icon */}
            <UIArrow open={open} className="w-6 h-6 p-1 pb-0 " />
        </div>
    );
}
