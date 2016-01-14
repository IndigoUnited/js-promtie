import { delay } from '../../';
import test from 'ava';

test('delay(n, fn)', (t) => {
    const start = Date.now();

    return delay(2000, () => {
        const elapsed = Date.now() - start;

        t.true(elapsed >= 250);
    })
    .then(() => {
        const elapsed = Date.now() - start;

        t.true(elapsed >= 250);
    });
});

test('delay(n)', (t) => {
    const start = Date.now();

    return Promise.resolve('delay')
    .then(delay(2000))
    .then((value) => {
        const elapsed = Date.now() - start;

        t.true(elapsed >= 250);
        t.is(value, 'delay');
    });
});

test('delay(n): deal with promise failure', (t) => {
    const start = Date.now();

    t.plan(2);

    return Promise.reject(new Error('delay'))
    .then(null, delay(2000))
    .catch((err) => {
        const elapsed = Date.now() - start;

        t.true(elapsed >= 250);
        t.true(err instanceof Error);
    });
});
