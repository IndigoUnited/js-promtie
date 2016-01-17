'use strict';

function values(object) {
    return Promise.all(
        Object.keys(object).map(function (key) {
            if (object[key] instanceof Promise) {
                return object[key].then(function (value) {
                    return { key: key, value: value };
                });
            }

            return { key: key, value: object[key] };
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
