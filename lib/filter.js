'use strict';

var limitConcurrency = require('../util/limitConcurrency');

function filter(arr, fn, options) {
    options = options || { concurrency: Infinity };

    return Promise.all(arr)
    .then(function (result) {
        return limitConcurrency(options.concurrency, result.map(function (value, i, array) {
            return function () { return fn(value, i, array); };
        }))
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
module.exports = function (array, fn, options) {
    if (typeof array === 'function') {
        fn = array;

        return function (array) {
            return filter(array, fn, options);
        };
    }

    return filter(array, fn, options);
};
