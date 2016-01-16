'use strict';

/*
 * Returns a function that will handle an error if it passes the predicate function test.
 * If the predicate returns false, the error is propagated.
 * Useful for treating different cases of errors without cluttering the code with switch cases/ifs.
 *
 * TODO: also accept matching by object and function object
 */
module.exports = function (predicateFn, fn) {
    return function (err) {
        if (predicateFn(err)) {
            return fn(err);
        }

        throw err;
    };
};
