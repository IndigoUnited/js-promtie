'use strict';

function spread(array, fn, ctx) {
    return Promise.all(array).then(args => fn.apply(ctx || fn, args));
}

/*
 * Spreads array values to the arguments of `fn`.
 * You can pass a context object to bind to the function call.
 */
module.exports = (array, fn, ctx) => {
    if (typeof array === 'function') {
        fn = array;

        return array => spread(array, fn, ctx);
    }

    return spread(array, fn, ctx);
};
