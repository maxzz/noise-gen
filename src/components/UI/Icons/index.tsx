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
