import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils';
import { IconGithub } from '.';

export function GithubLink({ className, href, rel="nofollow noopener noreferrer", ...rest }: { href: string; rel?: string } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("w-4 h-4 p-px pt-0.5 border-[0.6px] rounded", className)} {...rest}>
            <a href={href} rel={rel} target="_blank" title="Open the source code of the project on GitHub">
                <IconGithub />
            </a>
        </div>
    );
}
