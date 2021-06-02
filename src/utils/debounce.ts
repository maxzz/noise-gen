export default function debounce(f: Function, timeout = 100) {
    let timer: any;
    let lastArgs: any;
    let lastThis: any;

    return function (...args: any[]) {
        //@ts-ignore
        lastThis = this;
        lastArgs = args;
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            timer = null;
            f.apply(lastThis, lastArgs);
        }, timeout);
    };
}