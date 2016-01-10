import { each } from '../../';
import test from 'ava';

test('each(fn)', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(each((n, i, length) => {
        t.is(n, input[i]);
        t.is(length, input.length);

        return n * 10;
    }))
    .then((arr) => {
        t.same(arr, input);
    });
});

test('each(arr, fn)', (t) => {
    const input = [1, 2, 3, 4];

    return each([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return n * 10;
        }
    )
    .then((arr) => {
        t.same(arr, input);
    });
});

test('each(arr, fn): iterator function returns promise', (t) => {
    const input = [1, 2, 3, 4];

    return each([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return Promise.resolve(n * 10);
        }
    )
    .then((arr) => {
        t.same(arr, input);
    });
});

test('each(fn): deal with promise failure', (t) => {
    const input = [1, 2, 3, 4];

    return t.throws(
        Promise.resolve([Promise.resolve(1), 2, Promise.reject(new Error('Failed to fetch third value')), 4])
        .then(each((n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return n * 10;
        })
    ), 'Failed to fetch third value');
});

test('each(arr, fn): deal with promise failure', (t) => {
    const input = [1, 2, 3, 4];

    return t.throws(each([Promise.resolve(1), 2, Promise.reject(new Error('Failed to fetch third value')), 4],
        (n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return n * 10;
        }
    ), 'Failed to fetch third value');
});
