import { settle } from '../../';
import test from 'ava';

test('settle(arr)', t => {
    return settle([Promise.resolve(1), Promise.reject(new Error('second promise'))])
    .then(settledPromises => {
        t.ok(settledPromises[0].fulfilled);
        t.notOk(settledPromises[0].rejected);
        t.is(settledPromises[0].value, 1);
        t.is(settledPromises[0].reason, null);

        t.notOk(settledPromises[1].fulfilled);
        t.ok(settledPromises[1].rejected);
        t.is(settledPromises[1].value, null);
        t.is(settledPromises[1].reason.message, 'second promise');
    });
});