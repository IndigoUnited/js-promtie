'use strict';

var limitConcurrency = require('./util/limitConcurrency');

/*
 * Wait until all the promises in the array settle,
 * and then resolve a promise with all the fulfilment values and/or rejections.
 */
module.exports = function (array, options) {
    options = options || { concurrency: Infinity };

    return limitConcurrency(options.concurrency, array.map(function (promise) {
        return function () {
            return Promise.resolve(promise) // Make sure it is a promise
            .then(function (value) {
                return {
                    fulfilled: true,
                    rejected: false,
                    value: value,
                    reason: null,
                };
            }, function (err) {
                return {
                    fulfilled: false,
                    rejected: true,
                    value: null,
                    reason: err,
                };
            });
        };
    }));
};
