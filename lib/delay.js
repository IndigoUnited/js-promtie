'use strict';

function delay(n, fn) {
    return new Promise(resolve => setTimeout(resolve, n)).then(fn);
}

/*
 * Delays the execution of the next promise by `n` milliseconds.
 */
module.exports = (n, fn) => {
    if (typeof fn === 'function') {
        return delay(n, fn);
    }

    return value => delay(n, () => {
        if (value instanceof Error) {
            throw value;
        }

        return value;
    });
};
