'use strict';

/*
 * Excecute `fn` while passing the resolved value or rejection through,
 * regardless of the promise's resolved value or rejection.
 * The promise fulfillment value is maintained and the rejection error is propagated as well.
 */
module.exports = function (fn) {
    return function (value) {
        var result;

        // If this is a rejection handler, propagate the error, after running fn
        if (value instanceof Error) {
            result = fn(value);

            if (result instanceof Promise) {
                return result.then(function () {
                    throw value;
                });
            }

            throw value;
        }

        result = fn(value);

        if (result instanceof Promise) {
            result.then(function () {
                return value;
            });
        }

        return value;
    };
};
