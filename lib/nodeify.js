'use strict';

/*
 * Returns a function that calls the callback function with the resulting value.
 * If the callback throws an error, it will be globally thrown.
 * If no callback is provided, the returned function simply returns the value.
 */
module.exports = (callback, ctx) => value => {
    if (callback) {
        if (value instanceof Error) {
            callback = callback.bind(ctx, value);
        } else {
            callback = callback.bind(ctx, null, value);
        }

        return setImmediate(callback);
    }

    if (value instanceof Error) {
        throw value;
    }

    return value;
};
