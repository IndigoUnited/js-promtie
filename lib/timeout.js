'use strict';

const attempt = require('./attempt');

/*
 * Do not wait more than `n` milliseconds for the operation to finish.
 * If Timeout is reached, the promise is rejected with `timeout.TimeoutError`.
 */
function timeout(timeout, promise) {
    if (typeof promise === 'function') {
        promise = attempt(promise);
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new TimeoutError()), timeout);

        return promise.then(resolve, reject);
    });
}

/*
 * TimeoutError error object.
 */
function TimeoutError() {
    this.message = 'TimeoutError: Operation timed out';
    this.code = 'ETIMEOUT';
}

TimeoutError.prototype = Object.create(Error.prototype);
TimeoutError.prototype.constructor = TimeoutError;

module.exports = timeout;
module.exports.TimeoutError = TimeoutError;
