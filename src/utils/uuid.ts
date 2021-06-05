function now(): number {
    var time = Date.now();
    var last = (now as any).last || time;
    return (now as any).last = time > last ? time : last + 1;
}

export default function time(): string {
    return now().toString(36);
}
