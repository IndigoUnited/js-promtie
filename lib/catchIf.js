'use strict';

/*
 * Returns a function that will handle an error if it passes the predicate function test,
 * or if it matches the object.
 * If the predicate returns false, the error is propagated.
 */
module.exports = (predicateFn, fn) => err => {
    if ((err instanceof Error && err instanceof predicateFn) || predicateFn(err)) {
        return fn(err);
    }

    throw err;
};
