'use strict';

const delay = require('./delay');
const attempt = require('./attempt');

/*
 * Whilst the `conditionFn` returns true, execute `fn`.
 * `fn` and `conditionFn` can return a value or a promise.
 * Delay in between iterations can be configured with `options.delay` (default is 0).
 */
module.exports = function whilst(conditionFn, fn, options) {
    options = options || { delay: 0 };

    return attempt(conditionFn).then(condition => {
        return condition && Promise.resolve(fn())
        // Even if delay is 0, we always do a setTimeout in order to let the event loop breathe.
        .then(delay(options.delay))
        .then(() => whilst(conditionFn, fn, options));
    });
};
