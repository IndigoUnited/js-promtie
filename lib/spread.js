'use strict';

module.exports = function (fn) {
    return function () {
        return Promise.all(arguments[0])
        .then(function (args) {
            return fn.apply(fn, args);
        });
    };
};
