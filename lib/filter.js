'use strict';

const limitConcurrency = require('./util/limitConcurrency');

function filter(arr, fn, options) {
    options = options || { concurrency: Infinity };

    return Promise.all(arr)
    .then(result => {
        return limitConcurrency(options.concurrency,
            result.map((value, index, array) => () => fn(value, index, array))
        )
        .then(shouldFilterResults => {
            const filteredResult = [];

            shouldFilterResults.forEach((shouldFilter, i) => {
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
module.exports = (array, fn, options) => {
    if (typeof array === 'function') {
        fn = array;

        return array => filter(array, fn, options);
    }

    return filter(array, fn, options);
};
