'use strict';

/*
 * Given a promise or a normal value, return a promise that fulfills to the value
 */
function fulfill(value) {
    return value instanceof Promise ? value : Promise.resolve(value);
}

/*
 * Given a function, return a promise that fulfills to the function's return value,
 * or reject when the function throws synchronous error.
 */
function fnFulfill(fn) {
    try {
        return fulfill(fn());
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = fulfill;
module.exports.fn = fnFulfill;
