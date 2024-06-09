import Lazy from '../src/core/Lazy';


// Simulated large data set
const largeDataSet = new Array(1000000).fill(null).map((_, index) => index);

// Lazy sequence to process data in chunks999
const lazyProcessing = new Lazy<number[]>(function* () {
    let start = 0;
    const chunkSize = 1000;
    while (start < largeDataSet.length) {
        const chunk = largeDataSet.slice(start, start + chunkSize);
        start += chunkSize;
        yield chunk;
    }
});

// Flatten the lazy sequence and process data
const processLargeDataSet = (): number => {
    const flattened = lazyProcessing.flatMap(chunk => new Lazy<number>(function* () { yield* chunk; }));
    return flattened.reduce((sum, value) => sum + value, 0);
};


const totalSum = processLargeDataSet();
console.log(totalSum); // Total sum of all elements in the large data set
