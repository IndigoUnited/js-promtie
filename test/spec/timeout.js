import { timeout } from '../../';
import test from 'ava';

test('timeout(n, promise)', (t) => {
    return timeout(100, Promise.resolve())
    .then(t.pass);
});

test('timeout(n, promise): throws TimeoutError when promise times out', (t) => {
    return t.throws(
        timeout(10, new Promise((resolve) => setTimeout(resolve, 100))),
        'TimeoutError: Operation timed out.'
    );
});

test('timeout(n, function)', (t) => {
    return timeout(100, () => Promise.resolve())
    .then(t.pass);
});

test('timeout(n, function): throws TimeoutError when promise times out', (t) => {
    return t.throws(
        timeout(10, () => {
            return new Promise((resolve) => {
                setTimeout(resolve, 100);
            });
        }),
        'TimeoutError: Operation timed out.'
    );
});
