'use strict';

function runPending(pending, running, results, concurrency) {
    var partialRunning = [];
    var fn;

    while (pending.length && running.length < concurrency) {
        fn = pending.shift();

        partialRunning.push(fn);
        running.push(fn);
    }

    return Promise.all(partialRunning.map(function (fn) {
        return Promise.resolve(fn())
        .then(function (value) {
            running.splice(running.indexOf(fn), 1);
            results.splice(results.indexOf(fn), 1, value);

            return pending.length && runPending(pending, running, results, concurrency);
        });
    }));
}

/*
 * Run a set of functions in parallel but with limited conccurrency
 */
module.exports = function (concurrency, fns) {
    var results;

    if (concurrency === Infinity) {
        try {
            return Promise.all(fns.map(function (fn) { return fn(); }));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    results = fns.map(function (fn) { return fn; });

    return runPending(fns, [], results, concurrency)
    .then(function () { return results; });
};
