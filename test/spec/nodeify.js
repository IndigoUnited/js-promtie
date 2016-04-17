import { nodeify } from '../../';
import Promise from '../util/promise';
import test from 'ava';

const originalSetImmediate = global.setImmediate;

test.afterEach(() => {
    global.setImmediate = originalSetImmediate;
});

test.cb.serial('nodeify(fn)', t => {
    t.plan(2);

    const unicorn = cb => Promise.resolve(1).then(nodeify(cb), nodeify(cb));

    unicorn((err, value) => {
        t.is(value, 1);
        t.falsy(err);

        t.end();
    });
});

test.cb('nodeify(fn): deal with promise failure', t => {
    t.plan(2);

    const unicorn = cb => Promise.reject(new Error('Failed promise')).then(nodeify(cb), nodeify(cb));

    unicorn((err, value) => {
        t.is(err.message, 'Failed promise');
        t.falsy(value);

        t.end();
    });
});

// TODO add test timeout (in the case setImmediate is not being called)
test.cb.serial('nodeify(fn): deal with fn throwing when called on failure', t => {
    const callback = (err, value) => {
        t.is(value, 'unicorn');
        t.falsy(err);

        throw new Error('Failed promise');
    };

    global.setImmediate = callback => {
        try {
            return callback();
        } catch (err) {
            t.is(err.message, 'Failed promise');
            t.end();
        }
    };

    Promise.resolve('unicorn')
    .then(nodeify(callback), null);
});

// TODO add test timeout (in the case setImmediate is not being called)
test.cb.serial('nodeify(fn): deal with fn throwing when called with success', t => {
    const callback = (err, value) => {
        t.is(err.message, 'Failed promise');
        t.falsy(value);

        throw err;
    };

    global.setImmediate = callback => {
        try {
            return callback();
        } catch (err) {
            t.is(err.message, 'Failed promise');
            t.end();
        }
    };

    Promise.reject(new Error('Failed promise'))
    .then(null, nodeify(callback));
});

test('nodeify()', t =>
    Promise.resolve(1)
    .then(nodeify())
    .then(value => t.is(value, 1))
);

test('nodeify(): deal with failure', t =>
    t.throws(
        Promise.reject(new Error('Bad unicorn')).then(nodeify(), nodeify()),
        'Bad unicorn'
    )
);
