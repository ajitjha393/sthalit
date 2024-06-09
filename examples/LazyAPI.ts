import Lazy from '../src/core/Lazy';

type GeneratorFunc<T> = () => Generator<T, void, unknown>;


// Function to fetch data from the API
const fetchData = async (page: number): Promise<number[]> => {
    // Mocking API call with random data for demonstration
    return new Promise(resolve => {
        setTimeout(() => {
            const data = Array.from({ length: 10 }, (_, i) => page * 10 + i);
            resolve(data);
        }, 100);
    });
};

// Function to create a Lazy sequence of API data
const createLazyApiData = async (pages: number): Promise<Lazy<number[]>> => {
    const data: number[][] = [];
    for (let page = 1; page <= pages; page++) {
        const fetchedData = await fetchData(page);
        data.push(fetchedData);
    }
    return new Lazy<number[]>(function* () {
        for (const chunk of data) {
            yield chunk;
        }
    });
};

// Flatten the lazy sequence of arrays and take the first 10 items
const getFirstTenItems = async (lazySequence: Lazy<number[]>): Promise<number[]> => {
    const flattened = lazySequence.flatMap(chunk => new Lazy<number>(function* () { yield* chunk; }));
    return flattened.take(10).toArray();
};

// Usage
(async () => {
    const lazyApiData = await createLazyApiData(3); // Fetch data from 3 pages
    const firstTenItems = await getFirstTenItems(lazyApiData);
    console.log(firstTenItems); // Array of first ten items from the lazy sequence
})();
