'use strict';

var fulfill = require('../util/fulfill');

// TODO Add concurrency limit
function filter(arr, fn, options) {
    options = options || { concurrency: Infinity };

    return Promise.all(arr.map(fulfill))
    .then(function (result) {
        return Promise.all(result.map(fn))
        .then(function (shouldFilterResults) {
            var filteredResult = [];

            shouldFilterResults.forEach(function (shouldFilter, i) {
                if (shouldFilter) {
                    filteredResult.push(result[i]);
                }
            });

            return filteredResult;
        });
    });
}

/*
 * Iterates over the `array` and filters out the array values if they do not pass the function test.
 *
 * If called as `each(fn)` it returns a function that takes the array
 * and returns the desired Promise.
 */
module.exports = function (arr, fn, options) {
    if (typeof arr === 'function') {
        fn = arr;

        return function (arr) {
            return filter(arr, fn, options);
        };
    }

    return filter(arr, fn, options);
};
