import { end } from '../../';
import test from 'ava';

test('end(fn)', (t) => {
    return Promise.resolve('unicorns')
    .then(end((value) => {
        t.is(value, 'unicorns');
    }))
    .then((value) => {
        t.is(value, 'unicorns');
    });
});

test('end(fn): deal with promise failure', (t) => {
    return t.throws(
        Promise.reject(new Error('unicorn is sad'))
        .then(null, end((err) => {
            t.is(err.message, 'unicorn is sad');
        })),
        'unicorn is sad'
    );
});
