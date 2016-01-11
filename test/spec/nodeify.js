import { nodeify } from '../../';
import test from 'ava';

test('nodeify(fn)', (t) => {
    t.plan(2);

    function cb(err, value) {
        t.is(value, 1);
        t.notOk(err);
    }

    return Promise.resolve(1)
    .then(nodeify(cb), cb);
});

test('nodeify(fn): deal with promise failure', (t) => {
    t.plan(2);

    function cb(err, value) {
        t.is(err.message, 'Failed promise');
        t.notOk(value);
    }

    return Promise.reject(new Error('Failed promise'))
    .then(nodeify(cb), cb);
});

test('nodeify()', (t) => {
    return Promise.resolve(1)
    .then(nodeify())
    .then((value) => {
        t.is(value, 1);
    });
});
