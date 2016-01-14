'use strict';

function delay(n, fn) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n);
    })
    .then(fn);
}

/*
 * Delays the execution of the next promise by `n` milliseconds.
 */
module.exports = function (n, fn) {
    if (typeof fn === 'function') {
        return delay(n, fn);
    }

    return function (value) {
        return delay(n, function () {
            if (value instanceof Error) {
                throw value;
            }

            return value;
        });
    };
};
