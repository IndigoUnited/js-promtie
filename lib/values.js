'use strict';

const isPromise = require('./util/isPromise');

function values(object) {
    const result = {};

    return Promise.all(Object.keys(object).map(key => {
        if (isPromise(object[key])) {
            return object[key].then(value => (result[key] = value));
        }

        return (result[key] = object[key]);
    }))
    .then(() => result);
}

/*
 * Resolve the values of an object, whether they are promises or values, fulfilled.
 */
module.exports = function (fn) {
    if (typeof fn === 'function') {
        return object => values(object).then(fn);
    }

    // fn is an object
    return values(fn);
};
