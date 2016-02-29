'use strict';

var limitConcurrency = require('./util/limitConcurrency');

/*
 * Execute `fn` `n` times.
 */
module.exports = function (n, fn, options) {
    var operations = [];

    options = options || { concurrency: Infinity };

    while (operations.length < n) {
        operations.push(function (i) {
            return fn(i);
        }.bind(null, operations.length + 1));
    }

    return limitConcurrency(options.concurrency, operations);
};
