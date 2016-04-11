import { through } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('through(fn)', t =>
    Promise.resolve('unicorns')
    .then(through(value => {
        t.is(value, 'unicorns');
    }))
    .then(value => {
        t.is(value, 'unicorns');
    })
);

test('through(fn): fn returns promise', t =>
    Promise.resolve('unicorns')
    .then(through(value => {
        t.is(value, 'unicorns');

        return Promise.resolve('fancy unicorn');
    }))
    .then(value => {
        t.is(value, 'unicorns');
    })
);

test('through(fn): deal with promise failure', t =>
    t.throws(
        Promise.reject(new Error('unicorn is sad'))
        .then(null, through(err => t.is(err.message, 'unicorn is sad'))),
        'unicorn is sad'
    )
);

test('through(fn): deal with promise failure when fn returns promise', t =>
    t.throws(
        Promise.reject(new Error('unicorn is sad'))
        .then(null, through(err => {
            t.is(err.message, 'unicorn is sad');

            return Promise.resolve();
        })),
        'unicorn is sad'
    )
);
