'use strict';

var isPromise = require('../util/isPromise');

function retry(retries, fn, options) {
    try {
        return fn(function (err) {
            if (retries <= 0) {
                throw err || new Error('RetryError');
            }

            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(retry(retries - 1, fn, options));
                }, options.delay);
            });
        }, retries + 1);
    } catch (err) {
        return Promise.reject(err);
    }
}

/*
 * Retry a function `n` times.
 */
module.exports = function (retries, fn, options) {
    var result;

    options = options || { delay: 0 };

    result = retry(retries - 1, fn, options);

    return isPromise(result) ? result : Promise.resolve(result);
};
