'use strict';

/*
 * Execute `fn` `n` times.
 */
module.exports = function (n, fn) {
    var promises = [];
    var i;

    for (i = 1; i <= n; ++i) {
        try {
            promises.push(fn(i));
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return Promise.all(promises);
};
