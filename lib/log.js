/**
 * log.js
 *
 * Winston logger configuration. Exports configured 'log'.
 */

'use strict';

const winston = require('winston');

const log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: 'ibb-server.log'})
  ]
});

module.exports = log;
