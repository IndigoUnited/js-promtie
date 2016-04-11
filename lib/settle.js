'use strict';

/*
 * Wait until all the promises in the array settle,
 * and then resolve a promise with all the fulfilment values and/or rejections.
 */
module.exports = array => Promise.all(array.map(promise =>
    Promise.resolve(promise) // Make sure it is a promise
    .then(value => ({
        fulfilled: true,
        rejected: false,
        value,
        reason: null,
    }), err => ({
        fulfilled: false,
        rejected: true,
        value: null,
        reason: err,
    }))
));
