'use strict';

/*
 * Given a promise or a normal value, return a promise that fulfills to the value
 */
module.exports = function fulfill(value) {
    if (value instanceof Promise) {
        return value;
    }

    return Promise.resolve(value);
};
