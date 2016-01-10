import { filter } from '../../';
import test from 'ava';

test('filter(fn)', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(filter((n, i, array) => {
        t.is(n, input[i]);
        t.same(array, input);

        return n > 2;
    }))
    .then((arr) => {
        t.same(arr, input.slice(2, input.length));
    });
});

test('filter(arr, fn)', (t) => {
    const input = [1, 2, 3, 4];

    return filter([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, array) => {
            t.is(n, input[i]);
            t.same(array, input);

            return n > 2;
        }
    )
    .then((arr) => {
        t.same(arr, input.slice(2, input.length));
    });
});

test('filter(arr, fn): filter function returns promise', (t) => {
    const input = [1, 2, 3, 4];

    return filter([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, array) => {
            t.is(n, input[i]);
            t.same(array, input);

            return Promise.resolve()
            .then(() => {
                return n > 2;
            });
        }
    )
    .then((arr) => {
        t.same(arr, input.slice(2, input.length));
    });
});
