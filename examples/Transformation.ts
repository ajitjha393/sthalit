import { lazyRange } from '../src/index';

// Create a lazy range from 0 to infinity
const numbers = lazyRange(0);

// Chain multiple operations: take, map, filter
const result = numbers
    .take(20)          // Take the first 20 numbers
    .map(x => x + 1)   // Increment each number by 1
    .filter(x => x % 2 === 0) // Filter out the odd numbers
    .toArray();

console.log(result); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
