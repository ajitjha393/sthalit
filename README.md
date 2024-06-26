# sthalit

`sthalit` : A Sanskrit word meaning "deferred" or "postponed," which aligns with the concept of lazy evaluation where computation is deferred until necessary.

`sthalit` is a powerful JavaScript library that brings lazy evaluation and efficient data processing to your projects. It allows you to handle large data sets and asynchronous operations in a memory-efficient and performant way.


## Installation

You can install sthalit via npm:

```bash
npm install sthalit
```


## Features

- **Memory Efficiency**: Process data in chunks, reducing memory usage and avoiding memory exhaustion.
- **Performance Optimization**: Optimize performance by only processing data when needed.
- **Flexibility**: Provides a high-level, declarative API for transforming and processing data.
- **Asynchronous Handling**: Simplifies asynchronous data processing with a consistent API.



## Use Cases Demonstrating Benefits
### 1. Processing Large Data Sets

Traditional Method:

  -  Loads the entire data set into memory, causing high memory usage and potential memory exhaustion.

```js
const largeDataSet = new Array(1000000).fill(null).map((_, index) => index);
const totalSum = largeDataSet.reduce((sum, value) => sum + value, 0);
console.log(totalSum);
```

Sthalit method:

- Processes data in chunks, reducing memory usage and optimizing performance.

 ```ts
import Lazy from '../core/Lazy';

// Simulated large data set
const largeDataSet = new Array(1000000).fill(null).map((_, index) => index);

// Lazy sequence to process data in chunks
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

// Usage
const totalSum = processLargeDataSet();
console.log(totalSum); // Total sum of all elements in the large data set


 ```


### 2. Fetching Data in Chunks

Traditional Method:

- Requires manual management of asynchronous data fetching and processing, often leading to complex and error-prone code.

```js

const fetchData = async (page) => {
    // Simulate fetching data from API
    return new Array(10).fill(null).map((_, i) => page * 10 + i);
};

const fetchAllData = async () => {
    const allData = [];
    for (let page = 1; page <= 3; page++) {
        const data = await fetchData(page);
        allData.push(...data);
    }
    return allData;
};

fetchAllData().then(data => {
    console.log(data);
});

```

Sthalit Method:

- Provides a clean, declarative API for fetching and processing data lazily and asynchronously.

```ts
import Lazy from '../core/Lazy';

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


```

## Advantages of Sthalit
**1. Memory Efficiency**

***Traditional Methods:*** Load the entire data set into memory, causing high memory usage and potential memory exhaustion.

***Sthalit:*** Processes data in chunks, reducing memory usage and allowing for processing of large data sets.

**2. Performance Optimization**
    
***Traditional Methods:*** Loading all data into memory can be time-consuming and inefficient.

**Sthalit:** Optimizes performance by processing data only when needed.

**3. Flexibility in Data Handling**

***Traditional Methods:*** Often require writing complex logic for chunking, transforming, and processing data.

***Sthalit:*** Provides a high-level, declarative API for handling data with methods like `map`, `filter`, `take`, `flatMap`, and `reduce`.


**4. Asynchronous Data Processing**

***Traditional Methods:*** Managing asynchronous data processing can be complex and error-prone.

***Sthalit:*** Simplifies asynchronous data processing with a consistent API for handling both synchronous and asynchronous data.


By using Sthalit, you can handle large data sets and asynchronous operations in a clean, efficient, and scalable manner.


## License

This project is licensed under the MIT License.
