'use strict';

module.exports = function (object) {
    return object instanceof Promise ||
        (object && typeof object === 'object' && typeof object.then === 'function');
};
