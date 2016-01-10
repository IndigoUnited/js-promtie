import { reduce } from '../../';
import test from 'ava';

test('reduce(fn, initialValue)', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(reduce((acc, n, i, length) => {
        t.is(n, input[i]);
        t.is(length, input.length);

        return Promise.resolve(acc + n);
    }, 0))
    .then((result) => t.is(result, 10));
});

test('reduce(fn)', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(reduce((acc, n, i, length) => {
        t.is(n, input[i]);
        t.is(length, input.length);

        return Promise.resolve(acc + n);
    }))
    .then((result) => t.is(result, 10));
});

test('reduce(arr, fn, initialValue)', (t) => {
    const input = [1, 2, 3, 4];

    return reduce([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (acc, n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return acc + n;
        }, 0
    )
    .then((result) => t.same(result, 10));
});

test('reduce(arr, fn)', (t) => {
    const input = [1, 2, 3, 4];

    return reduce([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (acc, n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return acc + n;
        }
    )
    .then((result) => t.same(result, 10));
});
