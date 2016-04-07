import { each } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('each(fn)', t => {
    const input = [1, 2, 3, 4];

    return Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3), 4])
    .then(each((n, i, length) => {
        t.is(n, input[i]);
        t.is(length, input.length);

        return n * 10;
    }))
    .then(array => {
        t.deepEqual(array, input);
    });
});

test('each(array, fn)', t => {
    const input = [1, 2, 3, 4];

    return each([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return n * 10;
        }
    )
    .then(array => {
        t.deepEqual(array, input);
    });
});

test('each(array, fn): iterator function returns promise', t => {
    const input = [1, 2, 3, 4];

    return each([Promise.resolve(1), 2, Promise.resolve(3), 4],
        (n, i, length) => {
            t.is(n, input[i]);
            t.is(length, input.length);

            return Promise.resolve(n * 10);
        }
    )
    .then(array => {
        t.deepEqual(array, input);
    });
});

test('each(fn): fn throws', t => {
    return Promise.resolve([Promise.resolve(1), 2, 3, 4])
    .then(each(() => { throw new Error('Failed'); }))
    .then(() => t.fail('Promise expected to reject'), err => t.is(err.message, 'Failed'));
});

test('each(array, fn): deal with promise failure', t => {
    return each([Promise.resolve(1), 2, 3, 4], () => {
        return Promise.reject(new Error('Failure'));
    })
    .then(() => t.fail('Promise expected to reject'), err => t.is(err.message, 'Failure'));
});
