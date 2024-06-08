import { lazyRange } from '../src/index';

const isPrime = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
};

const lazyPrimes = lazyRange(2).filter(isPrime);
const firstTenPrimes = lazyPrimes.take(10).toArray();
console.log(firstTenPrimes); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
