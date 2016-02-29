'use strict';

/*
 * Execute `fn` `n` times.
 */
module.exports = function (n, fn) {
    var promises = [];

    while (promises.length < n) {
        try {
            promises.push(fn(promises.length + 1));
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return Promise.all(promises);
};
