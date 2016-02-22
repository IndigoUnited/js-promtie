'use strict';

/*
 * Wait until all the promises in the array settle,
 * and then resolve a promise with all the fulfilment values and/or rejections.
 */
module.exports = function (array) {
    return Promise.all(array.map(function (promise) {
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
    }));
};
