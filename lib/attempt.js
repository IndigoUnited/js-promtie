'use strict';

/*
 * Start a chain of promises while wrapping synchronous exceptions to promise rejections.
 */
module.exports = function (fn) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(fn());
        } catch (err) {
            reject(err);
        }
    });
};
