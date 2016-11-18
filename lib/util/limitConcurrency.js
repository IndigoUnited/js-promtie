'use strict';

function runPending(pending, running, results, concurrency) {
    const partialRunning = [];
    let fn;

    while (pending.length && running.length < concurrency) {
        fn = pending.shift();

        partialRunning.push(fn);
        running.push(fn);
    }

    return Promise.all(partialRunning.map(fn =>
        Promise.resolve(fn()).then(value => {
            running.splice(running.indexOf(fn), 1);
            results.splice(results.indexOf(fn), 1, value);

            return pending.length && runPending(pending, running, results, concurrency);
        })
    ));
}

/*
 * Run a set of functions in parallel but with limited conccurrency
 */
module.exports = (concurrency, fns) => {
    if (concurrency === Infinity) {
        try {
            return Promise.all(fns.map(fn => fn()));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    const results = Array.from(fns);

    return runPending(fns, [], results, concurrency)
    .then(() => results);
};
