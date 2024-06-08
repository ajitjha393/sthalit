type GeneratorFunc<T> = () => Generator<T, void, unknown>;

class Lazy<T> {
    private generator: GeneratorFunc<T>;
    private cache: T[];
    private proxy: Lazy<T>;

    constructor(generator: GeneratorFunc<T>) {
        this.generator = generator;
        this.cache = [];
        this.proxy = new Proxy(this, {
            get: (target, prop: keyof Lazy<T>, receiver) => {
                if (typeof target[prop] === 'function') {
                    return (...args: unknown[]) => Reflect.apply(target[prop], target, args);
                }
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                return target.getValue(Number(prop));
            }
        });
        return this.proxy;
    }

    *[Symbol.iterator](): Generator<T, void, unknown> {
        for (let value of this.generator()) {
            yield value;
        }
    }

    private getValue(index: number): T | undefined {
        while (this.cache.length <= index) {
            const { value, done } = this.generator().next();
            if (done) break;
            this.cache.push(value);
        }
        return this.cache[index];
    }

    map<U>(func: (value: T) => U): Lazy<U> {
        const self = this;
        return new Lazy<U>(function* () {
            for (let value of self) {
                yield func(value);
            }
        });
    }

    filter(func: (value: T) => boolean): Lazy<T> {
        const self = this;
        return new Lazy<T>(function* () {
            for (let value of self) {
                if (func(value)) yield value;
            }
        });
    }

    take(n: number): Lazy<T> {
        const self = this;
        return new Lazy<T>(function* () {
            let count = 0;
            for (let value of self) {
                if (count++ >= n) break;
                yield value;
            }
        });
    }

    flatMap<U>(func: (value: T) => Lazy<U>): Lazy<U> {
        const self = this;
        return new Lazy<U>(function* () {
            for (let value of self) {
                yield* func(value);
            }
        });
    }

    reduce<U>(func: (accumulator: U, value: T) => U, initialValue: U): U {
        let accumulator = initialValue;
        for (let value of this) {
            accumulator = func(accumulator, value);
        }
        return accumulator;
    }

    zip<U>(other: Lazy<U>): Lazy<[T, U]> {
        const self = this;
        return new Lazy<[T, U]>(function* () {
            const iter1 = self[Symbol.iterator]();
            const iter2 = other[Symbol.iterator]();
            while (true) {
                const { value: val1, done: done1 } = iter1.next();
                const { value: val2, done: done2 } = iter2.next();
                if (done1 || done2) break;
                yield [val1, val2];
            }
        });
    }

    toArray(): T[] {
        return Array.from(this);
    }
}

export default Lazy;
