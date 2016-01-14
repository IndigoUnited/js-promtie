/* eslint global-require: 0 */

'use strict';

// TODO: allow each util to be requirable
// you can do so with require('promtie/lib/each') but :s

// Collections
exports.each = require('./lib/each');
exports.map = require('./lib/map');
exports.filter = require('./lib/filter');
exports.reduce = require('./lib/reduce');
exports.values = require('./lib/values');

// Promisification
// exports.promisify = require('./lib/promisify');
// exports.promisifyAll = require('./lib/promisifyAll');

// Others
// exports.try = require('./lib/try');
exports.spread = require('./lib/spread');
// exports.retry = require('./lib/retry');
exports.delay = require('./lib/delay');
// exports.timeout = require('./lib/timeout');
exports.catchIf = require('./lib/catchIf');
exports.nodeify = require('./lib/nodeify');
exports.end = require('./lib/end');
