'use strict';

/*
 * Do not wait more than `n` milliseconds for the operation to finish.
 * If Timeout is reached, the promise is rejected with `timeout.TimeoutError`.
 */
function timeout(timeout, promise) {
    if (typeof promise === 'function') {
        try {
            promise = promise();

            promise = promise instanceof Promise ? promise : Promise.resolve(promise);
        } catch (err) {
            promise = Promise.reject(err);
        }
    }

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var err = new Error('TimeoutError: Operation timed out.');

            err.code = 'ETIMEOUT';

            reject(err);
        }, timeout);

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
