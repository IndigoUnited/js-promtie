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

    if (object.prototype) {
        for (k in object.prototype) {
            if (typeof object.prototype[k] === 'function') {
                promisifiedObject[k] = promisify(object.prototype[k], object);

                if (Object.keys(object.prototype[k]).length) {
                    promisifiedObject[k] = promisifyAll(object.prototype[k], promisifiedObject[k]);
                }
            }
        }
    }

    return promisifiedObject;
}

module.exports = promisifyAll;
