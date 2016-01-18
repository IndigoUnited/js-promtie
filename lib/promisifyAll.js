'use strict';

var promisify = require('./promisify');

function promisifyAll(object, promisifiedObject) {
    var k;

    promisifiedObject = promisifiedObject || {};

    for (k in object) {
        if (typeof object[k] === 'function') {
            promisifiedObject[k] = promisify(object[k], object);

            if (Object.keys(object[k]).length) {
                promisifiedObject[k] = promisifyAll(object[k], promisifiedObject[k]);
            }
        }
    }

    return promisifiedObject;
}

/*
 * Promisifies all the enumerable own functions of an object,
 * returning a new object, or assigning methods to the `targetObject`.
 */
module.exports = promisifyAll;
