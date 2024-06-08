import { Lazy } from '../src/index';

const lazyRandomNumbers = (): Lazy<number> => {
    return new Lazy<number>(function* () {
        while (true) {
            yield Math.random();
        }
    });
};

const firstFiveRandomNumbers = lazyRandomNumbers().take(5).toArray();
console.log(firstFiveRandomNumbers); // [random values]
