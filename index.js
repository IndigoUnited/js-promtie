'use strict';

// Collections
exports.each = require('./lib/each');
exports.map = require('./lib/map');
exports.filter = require('./lib/filter');
exports.reduce = require('./lib/reduce');
exports.values = require('./lib/values');
exports.settle = require('./lib/settle');

// Others
exports.attempt = require('./lib/attempt');
exports.spread = require('./lib/spread');
exports.retry = require('./lib/retry');
exports.delay = require('./lib/delay');
exports.timeout = require('./lib/timeout');
exports.catchIf = require('./lib/catchIf');
exports.whilst = require('./lib/whilst');
exports.times = require('./lib/times');
exports.through = require('./lib/through');
exports.nodeify = require('./lib/nodeify');

// Promisification
exports.promisify = require('./lib/promisify');
exports.promisifyAll = require('./lib/promisifyAll');
