'use strict';

/*
 * Start a chain of promises while wrapping synchronous exceptions to promise rejections.
 */
module.exports = fn => new Promise((resolve, reject) => {
    try {
        resolve(fn());
    } catch (err) {
        reject(err);
    }
});
