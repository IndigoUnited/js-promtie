'use strict';

/*
 * Divide the array of functions in partials and Promise.all on each partial in series.
 */
module.exports = function (concurrency, array) {
    var partials = [];
    var i;

    if (concurrency === Infinity) {
        return Promise.all(array.map(function (fn) { return fn(); }));
    }

    for (i = 0; i < array.length; i += concurrency) {
        partials.push(array.slice(i, i + concurrency));
    }

    return partials.reduce(function (promise, partial) {
        promise = promise.then(function (result) {
            return Promise.all(partial.map(function (fn) { return fn(); }))
            .then(function (partialResult) {
                return result.concat(partialResult);
            });
        });

        return promise;
    }, Promise.resolve([]));
};
