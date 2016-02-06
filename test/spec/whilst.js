import { whilst } from '../../';
import test from 'ava';

test('whilst(conditionFn, fn)', (t) => {
    let count = 0;
    let lastCount = count;

    setInterval(() => {
        count += 1;
    }, 20);

    return whilst(() => {
        lastCount = count;

        return count <= 3;
    }, () => t.ok(count <= 3))
    .then(() => t.ok(lastCount > 3));
});

test('whilst(conditionFn, fn, options)', (t) => {
    const start = Date.now();
    let count = 0;
    let lastCount = count;

    setInterval(() => {
        count += 1;
    }, 20);

    return whilst(() => {
        lastCount = count;

        return count <= 3;
    }, () => t.ok(count <= 3), { delay: 100 })
    .then(() => {
        t.ok(lastCount > 3);
        t.ok((Date.now() - start) > 100);
    });
});

test('whilst(conditionFn, fn): conditionFn returns promise', (t) => {
    let count = 0;
    let lastCount = count;

    setInterval(() => {
        count += 1;
    }, 20);

    return whilst(() => {
        lastCount = count;

        return Promise.resolve(count <= 3);
    }, () => t.ok(count <= 3))
    .then(() => t.ok(lastCount > 3));
});

test('whilst(conditionFn, fn): fn returns promise', (t) => {
    let count = 0;
    let lastCount = count;

    setInterval(() => {
        count += 1;
    }, 20);

    return whilst(() => {
        lastCount = count;

        return count <= 3;
    }, () => {
        t.ok(count <= 3);

        return Promise.resolve();
    })
    .then(() => t.ok(lastCount > 3));
});

test('whilst(conditionFn, fn): conditionFn and fn return promises', (t) => {
    let count = 0;
    let lastCount = count;

    setInterval(() => {
        count += 1;
    }, 20);

    return whilst(() => {
        lastCount = count;

        return Promise.resolve(count <= 3);
    }, () => {
        t.ok(count <= 3);

        return Promise.resolve();
    })
    .then(() => t.ok(lastCount > 3));
});

test('whilst(conditionFn, fn): conditionFn throws', (t) => {
    return whilst(() => {
        throw new Error('condition not met');
    }, () => {
        t.fail('should not have run this');
    })
    .then(() => t.fail('expected to fail'), err => t.is(err.message, 'condition not met'));
});

test('whilst(conditionFn, fn): fn throws', (t) => {
    return whilst(() => true, () => {
        throw new Error('condition not met');
    })
    .then(() => t.fail('expected to fail'), err => t.is(err.message, 'condition not met'));
});
