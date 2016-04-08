'use strict';

module.exports = object =>
    object instanceof Promise ||
    (object && typeof object === 'object' && typeof object.then === 'function');
