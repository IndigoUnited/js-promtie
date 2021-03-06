import { filter } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('filter(fn)', t => {
    const input = [1, 2, 3, 4];

    return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(filter((n, i, array) => {
        t.is(n, input[i]);
        t.deepEqual(array, input);

        return n > 2;
    }))
    .then(array => t.deepEqual(array, [3, 4]));
});

test('filter(array, fn)', t => {
    const input = [1, 2, 3, 4];

    return filter([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, array) => {
            t.is(n, input[i]);
            t.deepEqual(array, input);

            return n > 2;
        }
    )
    .then(array => t.deepEqual(array, [3, 4]));
});

test('filter(array, fn): filter function returns promise', t => {
    const input = [1, 2, 3, 4];

    return filter([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, array) => {
            t.is(n, input[i]);
            t.deepEqual(array, input);

            return Promise.resolve(n > 2);
        }
    )
    .then(array => t.deepEqual(array, [3, 4]));
});

test('filter(array, fn, options): limit concurrency', t => {
    const start = Date.now();

    return filter(
        [Promise.resolve(1), 2, 3, 4],
        () => new Promise(resolve => setTimeout(() => resolve((Date.now() - start) >= 500), 250)),
        { concurrency: 2 }
    )
    .then(result => t.deepEqual(result, [3, 4]));
});
