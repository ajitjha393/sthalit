import Lazy from './Lazy';

export const lazyRange = (start = 0, end = Infinity, step = 1): Lazy<number> => {
    return new Lazy<number>(function* () {
        for (let i = start; i < end; i += step) {
            yield i;
        }
    });
};

export const lazyRepeat = <T>(value: T, times = Infinity): Lazy<T> => {
    return new Lazy<T>(function* () {
        for (let i = 0; i < times; i++) {
            yield value;
        }
    });
};
