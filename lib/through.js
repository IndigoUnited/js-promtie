'use strict';

var fulfill = require('../util/fulfill');

/*
 * Excecute `fn` while passing the resolved value or rejection through,
 * regardless of the promise's resolved value or rejection.
 * The promise fulfillment value is maintained and the rejection error is propagated as well.
 */
module.exports = function (fn) {
    return function (value) {
        // If this is a rejection handler, propagate the error, after running fn
        if (value instanceof Error) {
            return fulfill(fn(value))
            .then(function () {
                throw value;
            });
        }

        return fulfill(fn.apply(fn, arguments))
        .then(function () {
            return value;
        });
    };
};
