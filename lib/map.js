'use strict';

var isPromise = require('../util/isPromise');
var limitConcurrency = require('../util/limitConcurrency');

function map(array, fn, options) {
    options = options || { concurrency: Infinity };

    return limitConcurrency(options.concurrency, array.map(function (value, i) {
        return function () {
            if (isPromise(value)) {
                return value.then(function (value) {
                    return fn(value, i, array.length);
                });
            }

            try {
                return fn(value, i, array.length);
            } catch (err) {
                return Promise.reject(err);
            }
        };
    }));
}

/*
 * Iterates over the array and calls fn on each value
 * (or promise that resolves to a value) in parallel.
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
