'use strict';

const isPromise = require('./util/isPromise');

function each(array, fn) {
    let promiseEach = Promise.resolve();

    return Promise.all(array.map((value, i) => {
        promiseEach = promiseEach.then(() => {
            if (isPromise(value)) {
                return value.then(value => fn(value, i, array.length));
            }

            return fn(value, i, array.length);
        });

        return value;
    }))
    .then(result => promiseEach.then(() => result));
}

/*
 * Iterates over the array and calls fn on each value
 * (promise that resolves to a value) in series.
 *
 * If called as `each(fn)` it returns a function that takes the array
 * and returns the desired Promise.
 */
module.exports = (array, fn) => {
    if (typeof array === 'function') {
        fn = array;

        return array => each(array, fn);
    }

    return each(array, fn);
};
