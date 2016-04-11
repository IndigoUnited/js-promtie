'use strict';

const isPromise = require('./util/isPromise');
const limitConcurrency = require('./util/limitConcurrency');

function map(array, fn, options) {
    options = options || { concurrency: Infinity };

    return limitConcurrency(options.concurrency, array.map((value, i) => () => {
        if (isPromise(value)) {
            return value.then(value => fn(value, i, array.length));
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
 * (or promise that resolves to a value) in parallel.
 */
module.exports = (array, fn, options) => {
    if (typeof array === 'function') {
        fn = array;

        return array => map(array, fn, options);
    }

    return map(array, fn, options);
};
