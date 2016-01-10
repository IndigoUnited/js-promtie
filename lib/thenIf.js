'use strict';

var fulfill = require('../util/fulfill');

module.exports = function (predicate, fnSuccess) {
    return function (value) {
        return fulfill(typeof predicate === 'function' ? predicate(value) : predicate)
        .then(function (shouldExecute) {
            return shouldExecute ? fnSuccess(value) : value;
        });
    };
};
