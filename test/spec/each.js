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
