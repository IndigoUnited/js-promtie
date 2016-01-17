import { catchIf } from '../../';
import Promise from '../util/promise';
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
        .catch(catchIf(() => false, t.fail)),
        'ENOENT: file not found'
    );
});

test('catchIf(object, fn): on object match', (t) => {
    function CustomError() {}
    CustomError.prototype = Object.create(Error.prototype);
    CustomError.constructor = function (msg) { this.message = msg; };

    return Promise.reject(new CustomError('ENOENT: file not found'))
    .catch(catchIf(CustomError, (err) => {
        t.ok(err.message, 'ENOENT: file not found');
    }));
});

test('catchIf(object, fn): on object match', (t) => {
    function CustomError() {}
    CustomError.prototype = Object.create(Error.prototype);
    CustomError.constructor = function (msg) { this.message = msg; };

    return t.throws(
        Promise.reject(new Error('ENOENT: file not found'))
        .catch(catchIf(CustomError, t.fail)),
        'ENOENT: file not found'
    );
});
