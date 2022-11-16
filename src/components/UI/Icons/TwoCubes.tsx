import React, { SVGAttributes } from 'react';

function StaticCube({ className, ...rest }: SVGAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" {...rest} >
            <path d="M12.94 2.99c-.53-.31-1.39-.31-1.91 0s-.52.8 0 1.11 1.39.31 1.92 0 .52-.8 0-1.11" />
            <path d="M17.81 5.8c-.53-.31-1.39-.31-1.91 0s-.52.8 0 1.11 1.39.31 1.92 0 .52-.8 0-1.11" />
            <path d="M12.96 5.78c-.53-.31-1.39-.31-1.92 0s-.52.8 0 1.11 1.39.31 1.91 0 .52-.8 0-1.11" />
            <path d="M13 8.6c-.53-.31-1.39-.31-1.91 0s-.52.8 0 1.11 1.39.31 1.91 0 .52-.8 0-1.11" />
            <path d="M8.13 5.78c-.53-.31-1.39-.31-1.92 0s-.52.8 0 1.11 1.39.31 1.91 0 .52-.8 0-1.11" />
            <path d="M4.74 9.56c-.53-.31-.96-.06-.96.55s.43 1.35.96 1.66.96.06.96-.55-.43-1.35-.96-1.66" />
            <path d="M9.6 12.34c-.53-.31-.96-.06-.96.55s.43 1.35.96 1.66.96.06.96-.55-.43-1.35-.96-1.66" />
            <path d="M9.56 17.85c-.53-.31-.96-.06-.96.55s.43 1.35.96 1.66.96.06.96-.55-.43-1.35-.96-1.66" />
            <path d="M4.71 15.09c-.53-.31-.96-.06-.96.55s.43 1.35.96 1.66.96.06.96-.55-.43-1.35-.96-1.66" />
            <path d="M16.9 13.71c-.53.31-.96 1.05-.96 1.66s.43.86.96.55.96-1.05.96-1.66-.43-.86-.96-.55" />
            <g>
                <path d="m12.21 22.92-.03-10.8 9.4-5.43.03 10.8-9.4 5.43m9.51-16.63-9.68 5.59s-.07.06-.1.11a.27.27 0 0 0-.04.14l.03 11.13s.02.08.04.09c.03.02.06.01.1-.01l9.68-5.59s.07-.06.1-.11.04-.1.04-.14l-.14.08.14-.08-.03-11.13s-.02-.08-.04-.09c-.03-.02-.06-.01-.1.01" />
                <path d="m2.42 17.5.03-10.8 9.4 5.43-.03 10.8-9.4-5.43m9.57-5.62L2.31 6.29s-.07-.03-.1-.01c-.03.02-.04.05-.04.09L2.14 17.5l.04.14c.02.05.06.08.1.11l9.68 5.59s.07.03.1.01.04-.05.04-.09l-.14-.08.14.08.03-11.13s-.01-.09-.04-.14a.36.36 0 0 0-.1-.11" />
                <path d="M2.63 6.34 11.97.91l9.4 5.43-9.34 5.43-9.4-5.43m19.16-.08L12.11.67s-.09-.03-.14-.03a.29.29 0 0 0-.14.03L2.21 6.26s-.06.05-.06.08.02.06.06.08l9.68 5.59s.09.03.14.03.11-.01.14-.03l-.14-.08.14-.08-.14.08.14.08 9.62-5.59s.06-.05.06-.08-.02-.06-.06-.08" />
            </g>
        </svg>
    );
}

export function TwoCubes() {
    return (
        <div className="relative active:animate-bounce flex items-center">
            <StaticCube className="w-5 h-5 rotate-12" />
            <StaticCube className="w-5 h-5 rotate-45" />
        </div>
    );
}