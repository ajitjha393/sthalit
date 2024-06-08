import { Lazy } from '../src/index';

const lazyFibonacci = (): Lazy<number> => {
    return new Lazy<number>(function* () {
        let a = 0, b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    });
};

const firstTenFibonacci = lazyFibonacci().take(10).toArray();
console.log(firstTenFibonacci); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
