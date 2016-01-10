'use strict';

/*
 * Given a promise or a normal value, return a promise that fulfills to the value
 */
module.exports = function fulfill(value) {
    return value instanceof Promise ? value : Promise.resolve(value);
};
