'use strict';

/*
 * Wait until all the promises present in the array settle,
 * and then resolve a promise with all the fulfilment values or rejections.
 */
module.exports = function (array) {
    return Promise.all(array.map(function (promise) {
        promise = Promise.resolve(promise); // Make sure its a promise

        return promise.then(function (value) {
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
