/* eslint global-require: 0 */

'use strict';

// TODO: allow each util to be requirable as require('promtie/each')

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
exports.attempt = require('./lib/attempt');
exports.spread = require('./lib/spread');
// exports.retry = require('./lib/retry');
exports.delay = require('./lib/delay');
// exports.timeout = require('./lib/timeout');
exports.catchIf = require('./lib/catchIf');
exports.nodeify = require('./lib/nodeify');
exports.end = require('./lib/end');
