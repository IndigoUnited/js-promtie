'use strict';

var fulfill = require('../util/fulfill');

function each(arr, fn) {
    var promise = Promise.resolve();
    var result = [];

    arr.forEach(function (value, i) {
        promise = promise.then(function () {
            return fulfill(value).then(function (value) {
                return fn(value, i, arr.length);
            });
        });

        if (value instanceof Promise || typeof value.then === 'function') {
            value.then(function (value) {
                result[i] = value;
            });
        } else {
            result[i] = value;
        }
    });

    return promise.then(function () {
        return result;
    });
}

module.exports = function (arr, fn) {
    if (typeof arr === 'function') {
        fn = arr;

        return function (arr) {
            return each(arr, fn);
        };
    }

    return each(arr, fn);
};
