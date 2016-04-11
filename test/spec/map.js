import { map } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('map(fn)', t => {
    const expected = [1, 2, 3, 4];

    return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(map((n, i, length) => {
        t.is(n, expected[i]);
        t.is(length, expected.length);

        return n * 2;
    }))
    .then(array => t.deepEqual(array, expected.map((n) => n * 2)));
});

test('map(array, fn)', t => {
    const expected = [1, 2, 3, 4];

    return map([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
            t.is(n, expected[i]);
            t.is(length, expected.length);

            return n * 2;
        }
    )
    .then(array => t.deepEqual(array, expected.map((n) => n * 2)));
});

test('map(array, fn): mapper function returns promise', t => {
    const expected = [1, 2, 3, 4];

    return map([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
            t.is(n, expected[i]);
            t.is(length, expected.length);

            return Promise.resolve(n * 2);
        }
    )
    .then(array => t.deepEqual(array, expected.map((n) => n * 2)));
});

test('map(array, fn): mapper function throws', t => {
    return t.throws(
        map([Promise.resolve(1), 2, Promise.resolve(3), 4], () => {
            throw new Error('Mapper function failed');
        }),
        'Mapper function failed'
    );
});

test('map(array, fn): deal with promise failure', t => {
    const expected = [1, 2, 3, 4];

    return t.throws(map([Promise.resolve(1), 2, Promise.reject(new Error('Failed to fetch third value')), 4],
        (n, i, length) => {
            t.is(n, expected[i]);
            t.is(length, expected.length);

            return Promise.resolve(n * 2);
        }
    ), 'Failed to fetch third value');
});

test('map(array, fn, options): limit concurrency', t => {
    const start = Date.now();
    const expected = [1, 2, 3];

    return map([
        Promise.resolve(1), 2, 3],
        value => new Promise((resolve) => setTimeout(() => resolve({ n: value, time: Date.now() - start }), 250)),
        { concurrency: 2 }
    )
    .then(result => {
        t.is(result.length, 3);

        result.forEach((value, i) => {
            t.is(value.n, expected[i]);
            // Only the last one should be delayed
            t.true(i >= 2 ? value.time >= 500 : value.time < 500);
        });
    });
});

test('map(array, fn, options): limit concurrency (stress test)', t => {
    const start = Date.now();
    const total = 500;
    const concurrency = 50;
    const input = [];

    while (input.length < total) {
        input.push(input.length);
    }

    return map(
        input.map((n, i) => i),
        value => new Promise(resolve => setTimeout(() => resolve({ n: value, time: Date.now() - start }), 50)),
        { concurrency }
    )
    .then(result => {
        t.is(result.length, total);

        result.forEach((value, i) => {
            const maxExpected = Math.floor(i / concurrency) * concurrency + concurrency;

            t.is(value.n, i);
            t.true(value.time >= maxExpected);
        });
    });
});
