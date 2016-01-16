'use strict';

function spread(array, fn, ctx) {
    return Promise.all(array)
    .then(function (args) {
        return fn.apply(ctx || fn, args);
    });
}

/*
 * Spreads array values to the arguments of `fn`.
 * You can pass a context object to bind to the function call.
 */
module.exports = function (array, fn, ctx) {
    if (typeof array === 'function') {
        fn = array;

        return function (array) {
            return spread(array, fn, ctx);
        };
    }

    return spread(array, fn, ctx);
};
