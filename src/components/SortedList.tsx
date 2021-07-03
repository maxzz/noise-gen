import { animated, useSprings } from '@react-spring/web';
import React from 'react';
import { useDrag } from 'react-use-gesture';
import clamp from 'lodash.clamp';
import swap from 'lodash-move';

import styles from './SortedList.module.scss';

const enum LOCAL {
    ROWHEIGHT = 50,
    FULLHIGHT = ROWHEIGHT * 2,
}

const fn = (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) => {
    return (index: number) => {
        console.log('fn', index, 'active', active, 'originalIndex', originalIndex, 'curIndex', curIndex, 'y', y, 'order', order);
        
        return active && index === originalIndex
            ? {
                y: curIndex * LOCAL.ROWHEIGHT + y,
                scale: 1.1,
                zIndex: 1,
                shadow: 15,
                immediate: (key: string) => key === 'y' || key === 'zIndex',
            }
            : {
                y: order.indexOf(index) * LOCAL.ROWHEIGHT,
                scale: 1,
                zIndex: 0,
                shadow: 1,
                immediate: false,
            };
    };
};

function DraggableList({ items }: { items: string[]; }) {
    const order = React.useRef(items.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
    const [springs, api] = useSprings(items.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

    const bind = useDrag(
        ({ args: [originalIndex], active, movement: [, y] }) => {
            const curIndex = order.current.indexOf(originalIndex);
            const curRow = clamp(Math.round((curIndex * LOCAL.FULLHIGHT + y) / LOCAL.FULLHIGHT), 0, items.length - 1);
            const newOrder = swap(order.current, curIndex, curRow);

            api.start(fn(newOrder, active, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render

            if (!active) {
                order.current = newOrder;
            }
        }
    );

    return (
        <div className={styles.content} style={{ height: items.length * 50 }}>
            {springs.map(({ zIndex, shadow, y, scale }, i) => (
                <animated.div
                    {...bind(i)}
                    key={i}
                    style={{
                        zIndex,
                        boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                        y,
                        scale,
                    }}
                    data-max={i}
                    children={items[i]}
                />
            ))}
        </div>
    );
}

export default function SortedList() {
    return (
        <div className={styles.container}>
            <DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />
        </div>
    );
}
