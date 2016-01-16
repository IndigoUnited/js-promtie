'use strict';

/*
 * Returns a function that will handle an error if it passes the predicate function test, or if it matches the object.
 * If the predicate returns false, the error is propagated.
 * Useful for treating different types of errors without cluttering the code with switch cases/ifs.
 */
module.exports = function (predicateFn, fn) {
    return function (err) {
        if (typeof predicateFn !== 'function') {
            predicateFn = function () { return err instanceof predicateFn; };
        }

        if (predicateFn(err)) {
            return fn(err);
        }

        throw err;
    };
};
