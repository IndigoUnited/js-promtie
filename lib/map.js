'use strict';

var fulfill = require('../util/fulfill');

// TODO Add concurrency limit
function map(arr, fn, options) {
    options = options || { concurrency: Infinity };

    return Promise.all(arr.map(function (value, i) {
        return fulfill(value).then(function (value) {
            return fulfill(fn(value, i, arr.length));
        });
    }));
}

/*
 * Iterates over the array and calls fn on each value
 * (promise that resolves to a value) in parallel.
 *
 * If called as `map(fn)` it returns a function that takes the array
 * and returns the desired Promise.
 */
module.exports = function (arr, fn, options) {
    if (typeof arr === 'function') {
        fn = arr;

        return function (arr) {
            return map(arr, fn, options);
        };
    }

    return map(arr, fn, options);
};
