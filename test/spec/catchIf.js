import { catchIf } from '../../';
import test from 'ava';

test('catchIf(predicateFn, fn): on predicate returning true', (t) => {
    return Promise.reject(new Error('ENOENT: file not found'))
    .catch(catchIf((err) => err.message.indexOf('ENOENT') === 0, (err) => {
        t.ok(err.message, 'ENOENT: file not found');
    }));
});

test('catchIf(predicateFn, fn): on predicate returning false', (t) => {
    return t.throws(
        Promise.reject(new Error('ENOENT: file not found'))
        .catch(catchIf(() => false, 'ENOENT: file not found'))
    );
});
