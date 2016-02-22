import { settle } from '../../';
import test from 'ava';

test('settle', t => {
    return settle([Promise.resolve(1), Promise.reject(2)])
    .then(settledPromises => {
        t.same(settledPromises, [{
            fulfilled: true,
            rejected: false,
            value: 1,
            reason: null,
        }, {
            fulfilled: false,
            rejected: true,
            value: null,
            reason: 2,
        }]);
    });
});
