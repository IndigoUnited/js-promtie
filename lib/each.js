'use strict';

var fulfill = require('../util/fulfill');

function each(arr, fn) {
    var promiseEach = Promise.resolve();

    return Promise.all(arr.map(function (value, i) {
        promiseEach = promiseEach.then(function () {
            return fulfill(value).then(function (value) {
                return fn(value, i, arr.length);
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

module.exports = function (arr, fn) {
    if (typeof arr === 'function') {
        fn = arr;

        return function (arr) {
            return each(arr, fn);
        };
    }

    return each(arr, fn);
};
