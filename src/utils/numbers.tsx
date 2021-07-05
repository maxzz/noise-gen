export function random(min: number, max: number): number { //The maximum is exclusive and the minimum is inclusive
    return Math.random() * (max - min) + min;
}

export function randomIntInclusive(min: number, max: number) { //The maximum is inclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
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

export function withDigits(value: number, digits: number = 2): string {
    return value.toFixed(Math.max(Math.min(digits, 20), 0));
}

export function fractionLength(n: number) {
    return (('' + n).split(".")[1] || '').length;
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

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

// Keyboard events support

interface StepKeys {
    upKey: boolean;
    downKey: boolean;
}

function getStepForKey(baseStep: number, ev: React.KeyboardEvent | KeyboardEvent, keys: StepKeys): number {
    const realStep: number = baseStep * (ev.altKey ? 100 : 1) * (ev.shiftKey ? 10 : 1) * (ev.ctrlKey ? 0.1 : 1); // AI logic: shift: v+step*10; ctrl: v+step*0.1; alt: n/a
    return keys.upKey ? +realStep : keys.downKey ? -realStep : 0;
}

function getVerticalStepKeys(ev: React.KeyboardEvent | KeyboardEvent): StepKeys {
    return {
        upKey: ev.key === 'ArrowUp',
        downKey: ev.key === 'ArrowDown',
    };
}

function getHorizontalStepKeys(ev: React.KeyboardEvent | KeyboardEvent): StepKeys {
    return {
        upKey: ev.key === 'ArrowRight',
        downKey: ev.key === 'ArrowLeft',
    };
}

export function getShift4Input(baseStep: number, ev: React.KeyboardEvent | KeyboardEvent): number {
    return getStepForKey(baseStep, ev, getVerticalStepKeys(ev));
}

export function getShift4Slider(baseStep: number, ev: React.KeyboardEvent | KeyboardEvent): number {
    return getStepForKey(baseStep, ev, getHorizontalStepKeys(ev)) + getStepForKey(baseStep, ev, getVerticalStepKeys(ev));
}
