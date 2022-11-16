import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils';

export function GitHubSvg() {
    return (
        <svg className="stroke-1 stroke-current fill-[none]" viewBox="0 0 24 24">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    );
}

export function GithubLogo({ className, href, ...rest }: { href: string; } & HTMLAttributes<HTMLElement>) {
    return (
        <a href={href} target="_blank" title="Open the source code of the project on GitHub">
            <div className={classNames("w-4 h-4 p-px pt-0.5 border-[0.6px] rounded", className)} {...rest}>
                <GitHubSvg />
            </div>
        </a>
    );
}