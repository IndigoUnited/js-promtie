'use strict';

var fulfill = require('../util/fulfill');

// TODO Add concurrency limit
function filter(arr, fn, options) {
    options = options || { concurrency: Infinity };

    return Promise.all(arr.map(fulfill))
    .then(function (result) {
        return result.filter(fn);
    });
}

module.exports = function (arr, fn, options) {
    if (typeof arr === 'function') {
        fn = arr;

        return function (arr) {
            return filter(arr, fn);
        };
    }

    return filter(arr, fn);
};
