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
