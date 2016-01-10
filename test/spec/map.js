import { map } from '../../';
import test from 'ava';

test('map(fn)', (t) => {
    const input = [1, 2, 3, 4];

    return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(map((n, i, length) => {
        t.is(n, input[i]);
        t.is(length, input.length);

        return n * 2;
    }))
    .then((arr) => {
        t.same(arr, input.map((n) => n * 2));
    });
});

test('map(arr, fn)', (t) => {
    const input = [1, 2, 3, 4];

    return map([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return n * 2;
        }
    )
    .then((arr) => {
        t.same(arr, input.map((n) => n * 2));
    });
});
