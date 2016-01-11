'use strict';

var fulfill = require('../util/fulfill');

/*
 * Resolve the values of an object, whether they are promises or not.
 */
module.exports = function (object) {
    return Promise.all(
        Object.keys(object).map(function (key) {
            return fulfill(object[key])
            .then(function (value) {
                return { key: key, value: value };
            });
        })
    )
    .then(function (results) {
        return results.reduce(function (values, object) {
            values[object.key] = object.value;

            return values;
        }, {});
    });
};
