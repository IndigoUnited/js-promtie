'use strict';

var fulfill = require('../util/fulfill');

function values(object) {
    return Promise.all(
        Object.keys(object).map(function (key) {
            return fulfill(object[key])
            .then(function (value) {
                return { key: key, value: value };
            });
        })
    )
    .then(function (results) {
        // Zip the array of keys and values back to an object
        return results.reduce(function (values, object) {
            values[object.key] = object.value;

            return values;
        }, {});
    });
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
