'use strict';

var delay = require('./delay');
var attempt = require('./attempt');

function doBlock(conditionFn, fn, options) {
    return Promise.resolve(fn())
    // Even if delay is 0, we always do a setTimeout in order to let the event loop breathe.
    .then(delay(options.delay))
    .then(function () {
        return whilst(conditionFn, fn, options);
    });
}

function whilst(conditionFn, fn, options) {
    return attempt(conditionFn).then(function (condition) {
        return condition && doBlock(conditionFn, fn, options);
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
