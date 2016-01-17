'use strict';

/*
 * Promisifies a callback style function.
 */
module.exports = function (fn, ctx) {
    return function () {
        var args = Array.prototype.slice.call(arguments);

        return new Promise(function (resolve, reject) {
            args.push(function (err, result) {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });

            try {
                fn.apply(ctx || fn, args);
            } catch (err) {
                reject(err);
            }
        });
    };
};
