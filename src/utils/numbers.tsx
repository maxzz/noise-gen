export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function bytesToSize(bytes: number, precision: number): string {
    bytes = isNaN(bytes) ? 0 : bytes;
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let posttxt = 0;
    while (bytes >= 1024) {
        posttxt++;
        bytes = bytes / 1024;
    }
    return `${bytes.toFixed(precision)} ${sizes[posttxt]}`;
}

export function withDigits(value: number, digits: number = 4): string {
    return value.toFixed(Math.max(Math.min(digits, 20), 0));
}

export function lerp(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b;
}

export function invLerp(a: number, b: number, v: number): number {
    return (v - a) / (b - a);
}

export function remap(inMin: number, inMax: number, outMin: number, outMax: number, v: number): number {
    let t = invLerp(inMin, inMax, v);
    return lerp(outMin, outMax, t);
}

export function mapRange(fromValue: number, fromStart: number, fromEnd: number, toStart: number, toEnd: number): number {
    const p = (fromValue - fromStart) / (fromEnd - fromStart);
    return toStart + p * (toEnd - toStart);
}

export function constrainRange(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

// Keyboard events support

export interface StepKeys {
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    downKey: boolean;
    upKey: boolean;
}

export function getStepForKey(baseStep: number, keys: StepKeys): number {
    const step: number = baseStep * (keys.altKey || keys.ctrlKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
    return keys.upKey ? +step : keys.downKey ? -step : 0;
}

export function getVerticalStepKeys(ev: KeyboardEvent): StepKeys {
    return {
        altKey: ev.altKey,
        ctrlKey: ev.ctrlKey,
        shiftKey: ev.shiftKey,
        downKey: ev.key === 'ArrowDown',
        upKey: ev.key === 'ArrowUp'
    };
}

export function getHorizontalStepKeys(ev: KeyboardEvent): StepKeys {
    return {
        altKey: ev.altKey,
        ctrlKey: ev.ctrlKey,
        shiftKey: ev.shiftKey,
        downKey: ev.key === 'ArrowLeft',
        upKey: ev.key === 'ArrowRight'
    };
}
