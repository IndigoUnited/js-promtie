'use strict';

var fulfill = require('../util/fulfill');

// TODO Add concurrency limit
function filter(arr, fn, options) {
    options = options || { concurrency: Infinity };

    return Promise.all(arr.map(fulfill))
    .then(function (result) {
        return Promise.all(result.map(fn))
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

module.exports = function (arr, fn, options) {
    if (typeof arr === 'function') {
        fn = arr;

        return function (arr) {
            return filter(arr, fn);
        };
    }

    return filter(arr, fn);
};
