'use strict';

var fulfill = require('../util/fulfill');

function each(array, fn) {
    var promiseEach = Promise.resolve();

    return Promise.all(array.map(function (value, i) {
        promiseEach = promiseEach.then(function () {
            return fulfill(value).then(function (value) {
                return fn(value, i, array.length);
            });
        });

        return value;
    }))
    .then(function (result) {
        return promiseEach.then(function () {
            return result;
        });
    });
}

/*
 * Iterates over the array and calls fn on each value
 * (promise that resolves to a value) in series.
 *
 * If called as `each(fn)` it returns a function that takes the array
 * and returns the desired Promise.
 */
module.exports = function (array, fn) {
    if (typeof array === 'function') {
        fn = array;

        return function (array) {
            return each(array, fn);
        };
    }

    return each(array, fn);
};
