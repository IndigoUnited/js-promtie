import { spread } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('spread(fn)', t => {
    return Promise.resolve([1, 2, Promise.resolve(3), Promise.resolve(4)])
    .then(spread((n1, n2, n3, n4) => {
        t.is(n1, 1);
        t.is(n2, 2);
        t.is(n3, 3);
        t.is(n4, 4);
    }));
});

test('spread(fn): deal with promise failure', t => {
    return t.throws(
        Promise.resolve([1, 2, Promise.reject(new Error('error: 3')), Promise.resolve(4)])
        .then(spread(() => {})),
        'error: 3'
    );
});

test('spread(array, fn)', t => {
    return spread([1, 2, Promise.resolve(3), Promise.resolve(4)], (n1, n2, n3, n4) => {
        t.is(n1, 1);
        t.is(n2, 2);
        t.is(n3, 3);
        t.is(n4, 4);
    });
});

test('spread(array, fn): deal with promise failure', t => {
    return t.throws(
        spread([1, 2, Promise.reject(new Error('error: 3')), Promise.resolve(4)]),
        'error: 3'
    );
});
