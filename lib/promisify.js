'use strict';

/*
 * Promisifies a callback style function.
 */
module.exports = (fn, ctx) => function () {
    const args = Array.prototype.slice.call(arguments);

    return new Promise((resolve, reject) => {
        args.push((err, result) => {
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
