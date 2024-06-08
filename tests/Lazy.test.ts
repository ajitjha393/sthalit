import Lazy from '../src/core/Lazy';
import { lazyRange, lazyRepeat } from '../src/core/Generators';

describe('Lazy', () => {
    it('should create a lazy sequence and take the first 5 elements', () => {
        const sequence = new Lazy<number>(function* () {
            let i = 0;
            while (true) {
                yield i++;
            }
        });

        const result = sequence.take(5).toArray();
        expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it('should map values correctly', () => {
        const sequence = lazyRange(0).take(5).map(x => x * 2).toArray();
        expect(sequence).toEqual([0, 2, 4, 6, 8]);
    });

    it('should filter values correctly', () => {
        const sequence = lazyRange(0).take(10).filter(x => x % 2 === 0).toArray();
        expect(sequence).toEqual([0, 2, 4, 6, 8]);
    });

    it('should flatMap values correctly', () => {
        const sequence = lazyRange(0).take(3).flatMap(x => lazyRepeat(x, 2)).toArray();
        expect(sequence).toEqual([0, 0, 1, 1, 2, 2]);
    });

    it('should reduce values correctly', () => {
        const sum = lazyRange(0).take(5).reduce((acc, x) => acc + x, 0);
        expect(sum).toEqual(10);
    });

    it('should zip sequences correctly', () => {
        const seq1 = lazyRange(0).take(3);
        const seq2 = lazyRepeat('a').take(3);
        const zipped = seq1.zip(seq2).toArray();
        expect(zipped).toEqual([[0, 'a'], [1, 'a'], [2, 'a']]);
    });
});
