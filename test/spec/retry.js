import { retry } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('retry(n, fn): retry function not called', t => {
    let countdown = 2;

    return retry(2, (_, n) => {
        t.is(countdown--, n);
        return 'should not retry';
    })
    .then((result) => {
        t.is(result, 'should not retry');
        t.is(countdown, 1);
    });
});

test('retry(n, fn): retry function called until promise rejects', t => {
    let countdown = 5;

    return retry(5, (retryAgain, n) => {
        t.is(countdown--, n);
        return retryAgain(new Error('The unicorn is angry D:'));
    })
    .then(t.fail, (err) => {
        t.is(countdown, 0);
        t.is(err.message, 'The unicorn is angry D:');
    });
});

test('retry(n, fn): retry function called with no error until promise rejects', t => {
    let countdown = 5;

    return retry(5, (retryAgain, n) => {
        t.is(countdown--, n);
        return retryAgain();
    })
    .then(t.fail, (err) => {
        t.is(countdown, 0);
        t.is(err.message, 'RetryError');
    });
});

test('retry(n, fn): retry function called at least once but promise fulfills', t => {
    let countdown = 5;

    return retry(5, (retryAgain, n) => {
        t.is(countdown--, n);
        return n > 3 ? retryAgain(new Error('The unicorn is angry D:')) : 'unicorn is no longer angry';
    })
    .then((result) => {
        t.is(countdown, 2);
        t.is(result, 'unicorn is no longer angry');
    });
});

test('retry(n, fn): should not retry when fn throws', t => {
    let countdown = 3;

    return retry(3, () => {
        countdown--;
        throw new Error('Unicorns FTW');
    })
    .then(t.fail, (err) => {
        t.is(countdown, 2);
        t.is(err.message, 'Unicorns FTW');
    });
});

test('retry(n, fn): should not retry when fn returns a rejected promise', t => {
    let countdown = 3;

    return retry(3, () => {
        countdown--;
        return Promise.reject(new Error('Unicorns FTW'));
    })
    .then(t.fail, (err) => {
        t.is(countdown, 2);
        t.is(err.message, 'Unicorns FTW');
    });
});

test('retry(n, fn, options): delay between retries', t => {
    const start = Date.now();
    let countdown = 3;

    return retry(3, (retryAgain) => {
        countdown--;
        return retryAgain(new Error('Unicorns FTW'));
    }, { delay: 50 })
    .then(t.fail, (err) => {
        t.is(countdown, 0);
        t.is(err.message, 'Unicorns FTW');
        t.true((Date.now() - start) >= 100);
    });
});
