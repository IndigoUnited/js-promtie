'use strict';

function retry(retries, fn) {
    try {
        return fn(function (err) {
            if (retries <= 0) {
                throw err || new Error('RetryError');
            }

            return retry(retries - 1, fn);
        }, retries + 1);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = function (retries, fn) {
    var result = retry(retries - 1, fn);

    return result instanceof Promise ? result : Promise.resolve(result);
};
