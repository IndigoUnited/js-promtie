'use strict';

const isPromise = require('./util/isPromise');

function retry(retries, fn, options) {
    try {
        return fn(err => {
            if (retries <= 0) {
                throw err || new Error('RetryError');
            }

            return new Promise(resolve => setTimeout(() => resolve(retry(retries - 1, fn, options)), options.delay));
        }, retries + 1);
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
 * Retry a function `n` times.
 */
module.exports = (retries, fn, options) => {
    options = options || { delay: 0 };

    const result = retry(retries - 1, fn, options);

    return isPromise(result) ? result : Promise.resolve(result);
};
