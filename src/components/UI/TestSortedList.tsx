import React from 'react';
import { animated, useSprings } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import clamp from 'lodash.clamp';
import swap from 'lodash-move';

import styles from './TestSortedList.module.scss';

const enum LOCAL {
    ROW_HEIGHT_HALF = 50,
    ROW_HIGHT = ROW_HEIGHT_HALF * 2,
}

const fn = (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) => {
    return (index: number) => {
        console.log('fn', 'active', active, 'index', index, 'originalIndex', originalIndex, 'curIndex', curIndex, 'y', y, 'order', order);

        return active && index === originalIndex
            ? {
                y: curIndex * LOCAL.ROW_HEIGHT_HALF + y,
                scale: 1.1,
                zIndex: 1,
                shadow: 15,
                immediate: (key: string) => key === 'y' || key === 'zIndex',
            }
            : {
                y: order.indexOf(index) * LOCAL.ROW_HEIGHT_HALF,
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
        (props) => {
            let { args: [originalIndex], active, movement: [, y] } = props;
            const curIndex = order.current.indexOf(originalIndex);
            const curRow = clamp(Math.round((curIndex * LOCAL.ROW_HIGHT + y) / LOCAL.ROW_HIGHT), 0, items.length - 1);
            const newOrder = swap(order.current, curIndex, curRow);

            api.start(fn(newOrder, active, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render

            if (!active) {
                order.current = newOrder;
            }
        }
    );

    return (
        <div className={styles.content} style={{ height: items.length * 50 }}>
            {springs.map(({ y, scale, zIndex, shadow }, i) => {
                console.log('bind', bind);
                return (
                    <animated.div
                        {...bind(i)}
                        key={i}
                        style={{
                            y,
                            scale,
                            zIndex,
                            boxShadow: shadow.to(s => `rgba(255, 0, 0, 1) 0px ${s}px ${2 * s}px 0px`),
                            // boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                        }}
                        data-max={i}
                        children={`${items[i]} ${i}`}
                    />
                );
            })
            }
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
