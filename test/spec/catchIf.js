import { catchIf } from '../../';
import Promise from '../util/promise';
import test from 'ava';

test('catchIf(predicateFn, fn): on predicate returning true', t => {
    t.plan(1);

    return Promise.reject(new Error('ENOENT: file not found'))
    .catch(catchIf(err => err.message.indexOf('ENOENT') === 0, err => {
        t.truthy(err.message, 'ENOENT: file not found');
    }));
});

test('catchIf(predicateFn, fn): on predicate returning false', t =>
    t.throws(
        Promise.reject(new Error('ENOENT: file not found'))
        .catch(catchIf(() => false, () => t.fail('should not have failed'))),
        'ENOENT: file not found'
    )
);

test('catchIf(object, fn): custom error instance match', t => {
    function CustomError(msg) { this.message = msg; }
    CustomError.prototype = Object.create(Error.prototype);
    CustomError.constructor = function () {};

    t.plan(1);

    return Promise.reject(new CustomError('ENOENT: file not found'))
    .catch(catchIf(CustomError, err => {
        t.truthy(err.message, 'ENOENT: file not found');
    }));
});

test('catchIf(object, fn): custom error instance failed match', t => {
    function CustomError() {}
    CustomError.prototype = Object.create(Error.prototype);
    CustomError.constructor = function (msg) { this.message = msg; };

    return t.throws(
        Promise.reject(new Error('ENOENT: file not found'))
        .catch(catchIf(CustomError, () => t.fail('should not have matched CustomError'))),
        'ENOENT: file not found'
    );
});
