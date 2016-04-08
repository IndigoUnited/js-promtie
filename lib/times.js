'use strict';

const limitConcurrency = require('./util/limitConcurrency');

/*
 * Execute `fn` `n` times.
 */
module.exports = (n, fn, options) => {
    const operations = [];

    options = options || { concurrency: Infinity };

    while (operations.length < n) {
        operations.push(fn.bind(null, operations.length + 1));
    }

    return limitConcurrency(options.concurrency, operations);
};
