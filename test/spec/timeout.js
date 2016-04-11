import { timeout } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('timeout(n, promise)', t =>
    timeout(100, Promise.resolve())
    .then(t.pass.bind(t))
);

test('timeout(n, promise): throws TimeoutError when promise times out', t =>
    timeout(10, new Promise(resolve => setTimeout(resolve, 100)))
    .then(() => t.fail('Promise expected to reject'), err => {
        t.is(err.message, 'TimeoutError: Operation timed out');
        t.true(err instanceof timeout.TimeoutError);
    })
);

test('timeout(n, fn): fn returns a promise', t =>
    timeout(100, () => Promise.resolve(0))
    .then(value => value === 0 ? t.pass() : t.fail('expected to return 0'))
);

test('timeout(n, fn): fn returns a value', t =>
    timeout(100, () => 0)
    .then(value => value === 0 ? t.pass() : t.fail('expected to return 0'))
);

test('timeout(n, fn): fn throws', t =>
    timeout(10, () => { throw new Error('no'); })
    .then(() => t.fail('Promise expected to reject'), err => t.is(err.message, 'no'))
);
