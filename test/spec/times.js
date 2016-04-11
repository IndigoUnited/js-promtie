import { times } from '../../';
import test from 'ava';

test('times(n, fn)', t => {
    return times(5, i => Promise.resolve(i * 10))
    .then(result => t.deepEqual(result, [10, 20, 30, 40, 50]));
});

test('times(n, fn): when fn throws, promise should reject', t => {
    t.plan(1);

    return times(5, () => { throw new Error('error expected'); })
    .then(t.fail, error => t.is(error.message, 'error expected'));
});
