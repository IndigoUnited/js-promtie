'use strict';

var delay = require('./delay');
var isPromise = require('../util/isPromise');

function whilst(conditionFn, fn, options) {
    var condition;

    try {
        condition = conditionFn();
    } catch (err) {
        return Promise.reject(err);
    }

    if (isPromise(condition)) {
        return conditionFn()
        .then(function (condition) {
            return condition && fn()
            .then(delay(options.delay))
            .then(function () {
                return whilst(conditionFn, fn, options);
            });
        });
    }

    if (condition) {
        try {
            fn()
        }
    }

    return condition && fn()
    .then(delay(options.delay))
    .then(function () {
        return whilst(conditionFn, fn, options);
    });
}

/*
 * Whilst the `conditionFn` returns true, execute `fn`.
 * `fn` and `conditionFn` can return a value or a promise.
 * Delay in between iterations can be configured with `options.delay` (default is 0).
 */
module.exports = function (conditionFn, fn, options) {
    options = options || { delay: 0 };

    return whilst(conditionFn, fn, options);
};
