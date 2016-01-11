'use strict';

/*
 * Returns a function that calls the callback function with the resulting value.
 * If no callback is provided, the returned function simply returns the value.
 */
module.exports = function (callback) {
    return function (value) {
        return callback ? callback(null, value) : value;
    };
};
