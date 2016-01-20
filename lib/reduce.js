'use strict';

var isPromise = require('../util/isPromise');

function reduce(array, fn, initialValue) {
    var promiseReduce = isPromise(initialValue) ? initialValue : Promise.resolve(initialValue);

    array.forEach(function (value, i) {
        promiseReduce = promiseReduce.then(function (acc) {
            if (acc == null) {
                return value;
            }

            if (isPromise(value)) {
                return value.then(function (value) {
                    return fn(acc, value, i, array.length);
                });
            }

            return fn(acc, value, i, array.length);
        });
    });

    return promiseReduce;
}

/*
 * Iterates over the array and calls fn on each value and accumulates the result to reduce it to a single value.
 *
 * If called as `reduce(fn, [initialValue])` it returns a function that takes the array
 * and returns the desired Promise.
 */
module.exports = function (array, fn, initialValue) {
    if (typeof array === 'function') {
        initialValue = fn;
        fn = array;

        return function (array) {
            return reduce(array, fn, initialValue);
        };
    }

    return reduce(array, fn, initialValue);
};
