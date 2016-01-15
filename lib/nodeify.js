'use strict';

/*
 * Returns a function that calls the callback function with the resulting value.
 * If the callback throws an error, it will be globally thrown.
 * If no callback is provided, the returned function simply returns the value.
 */
module.exports = function (callback, ctx) {
    return function (value) {
        if (callback) {
            if (value instanceof Error) {
                return setImmediate(callback.bind(ctx, value));
            }

            return setImmediate(callback.bind(ctx, null, value));
        }

        if (value instanceof Error) {
            throw value;
        }

        return value;
    };
};
