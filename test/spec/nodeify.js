import { nodeify } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test.cb('nodeify(fn)', t => {
    t.plan(2);

    function unicorn(cb) {
        return Promise.resolve(1)
        .then(nodeify(cb), nodeify(cb));
    }

    unicorn((err, value) => {
        t.is(value, 1);
        t.notOk(err);

        t.end();
    });
});

test.cb('nodeify(fn): deal with promise failure', t => {
    t.plan(2);

    function unicorn(cb) {
        return Promise.reject(new Error('Failed promise'))
        .then(nodeify(cb), nodeify(cb));
    }

    unicorn((err, value) => {
        t.is(err.message, 'Failed promise');
        t.notOk(value);

        t.end();
    });
});

// TODO: Propose this method to AVA
function throwsUncaughtException(fn) {
    const listeners = process.listeners('uncaughtException');
    const avaListener = listeners[listeners.length - 1];

    // Remove AVA listener & track uncaught exception
    process.removeListener('uncaughtException', avaListener);
    process.once('uncaughtException', err => {
        // Restore listeners exactly how they were, including order
        process.removeAllListeners('uncaughtException');
        listeners.forEach((listener) => process.on('uncaughtException', listener));

        fn(err);
    });
}

test.cb('nodeify(fn): deal with fn throwing when called on failure', t => {
    throwsUncaughtException(err => {
        t.is(err.message, 'Failed promise');
        t.end();
    });

    Promise.resolve('unicorn')
    .then(nodeify((err, value) => {
        t.is(value, 'unicorn');
        t.notOk(err);

        throw new Error('Failed promise');
    }), null);
});

test.cb('nodeify(fn): deal with fn throwing when called with success', t => {
    throwsUncaughtException(err => {
        t.is(err.message, 'Failed promise');
        t.end();
    });

    Promise.reject(new Error('Failed promise'))
    .then(null, nodeify((err, value) => {
        t.is(err.message, 'Failed promise');
        t.notOk(value);

        throw err;
    }));
});

test('nodeify()', t => {
    return Promise.resolve(1)
    .then(nodeify())
    .then(value => {
        t.is(value, 1);
    });
});

test('nodeify(): deal with failure', t => {
    return t.throws(
        Promise.reject(new Error('Bad unicorn'))
        .then(nodeify(), nodeify()),
        'Bad unicorn'
    );
});
