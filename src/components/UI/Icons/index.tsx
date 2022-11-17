import React, { SVGAttributes } from "react";
import { classNames } from "@/utils";

export function IconTrash({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-current fill-transparent", className)} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...rest}>
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    );
}

export function IconCross({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-current fill-transparent", className)} viewBox="0 0 24 24" {...rest}>
        <path strokeLinecap="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

export function IconChevronHorizontal({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-current fill-transparent", className)} viewBox="0 0 24 24" {...rest}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
    );
}

export function IconMountains({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-transparent stroke-current", className)} strokeLinecap="round" strokeLinejoin="round" strokeWidth={.8} viewBox="0 0 24 24" {...rest}>
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );
}

export function IconAdd({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-transparent stroke-current", className)} strokeLinecap="round" strokeLinejoin="round" strokeWidth={.8} viewBox="0 0 24 24" {...rest}>
            <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
        </svg>
    );
}

export function IconSave({className, ...rest}: SVGAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-transparent stroke-current", className)} strokeLinecap="round" strokeLinejoin="round" strokeWidth={.8} viewBox="0 0 24 24" {...rest}>
            <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
    );
}
