'use strict';

var fulfill = require('../util/fulfill');

function retry(retries, fn) {
    return fulfill.fn(fn.bind(fn, function (err) {
        if (retries <= 0) {
            throw err || new Error('RetryError');
        }

        return retry(retries - 1, fn);
    }, retries + 1));
}

module.exports = function (retries, fn) {
    return retry(retries - 1, fn);
};
