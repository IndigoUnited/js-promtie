'use strict';

// TODO Add concurrency limit
function map(array, fn, options) {
    options = options || { concurrency: Infinity };

    return Promise.all(array.map(function (value, i) {
        if (value instanceof Promise) {
            return value.then(function (value) {
                return fn(value, i, array.length);
            });
        }

        try {
            return fn(value, i, array.length);
        } catch (err) {
            return Promise.reject(err);
        }
    }));
}

/*
 * Iterates over the array and calls fn on each value
 * (promise that resolves to a value) in parallel.
 *
 * If called as `map(fn)` it returns a function that takes the array
 * and returns the desired Promise.
 */
module.exports = function (array, fn, options) {
    if (typeof array === 'function') {
        fn = array;

        return function (array) {
            return map(array, fn, options);
        };
    }

    return map(array, fn, options);
};
