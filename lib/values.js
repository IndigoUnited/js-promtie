'use strict';

var isPromise = require('./util/isPromise');

function values(object) {
    var result = {};

    return Promise.all(
        Object.keys(object).map(function (key) {
            if (isPromise(object[key])) {
                return object[key].then(function (value) {
                    return (result[key] = value);
                });
            }

            result[key] = object[key];
        })
    )
    .then(function () { return result; });
}

/*
 * Resolve the values of an object, whether they are promises or values, fulfilled.
 */
module.exports = function (fn) {
    if (typeof fn === 'function') {
        return function (object) {
            return values(object)
            .then(fn);
        };
    }

    // fn is an object
    return values(fn);
};
