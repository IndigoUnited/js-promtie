import { through } from '../../';
import test from 'ava';

test('through(fn)', (t) => {
    return Promise.resolve('unicorns')
    .then(through((value) => {
        t.is(value, 'unicorns');
    }))
    .then((value) => {
        t.is(value, 'unicorns');
    });
});

test('through(fn): deal with promise failure', (t) => {
    return t.throws(
        Promise.reject(new Error('unicorn is sad'))
        .then(null, through((err) => {
            t.is(err.message, 'unicorn is sad');
        })),
        'unicorn is sad'
    );
});
