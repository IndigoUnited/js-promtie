/* eslint global-require: 0 */

'use strict';

// TODO: allow each util to be requirable
// you can do so: require('promtie/lib/each') but :s

exports.each = require('./lib/each');
exports.map = require('./lib/map');
exports.filter = require('./lib/filter');
exports.reduce = require('./lib/reduce');
exports.values = require('./lib/values');

exports.spread = require('./lib/spread');
exports.nodeify = require('./lib/nodeify');
exports.catchIf = require('./lib/catchIf');
