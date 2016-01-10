'use strict';

var fulfill = require('../util/fulfill');

function map(arr, fn, options) {
    var p = Promise.resolve();
    var result = [];

    options = options || { concurrency: Infinity };

    arr.forEach(function (value, i) {
        p = p.then(function () {
            return fulfill(value).then(function (value) {
                return fulfill(fn(value, i, arr.length))
                .then(function (mapResultValue) {
                    result[i] = mapResultValue;
                });
            });
        });
    });

    return p.then(function () {
        return result;
    });
}

module.exports = function (arr, fn, options) {
    if (typeof arr === 'function') {
        fn = arr;

        return function (arr) {
            return map(arr, fn);
        };
    }

    return map(arr, fn);
};
