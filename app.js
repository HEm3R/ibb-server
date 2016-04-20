/**
 * app.js
 *
 * Main application runner which registers routes and start server.
 */

'use strict';

const config = require('config');
const log = require('./lib/log');
const express = require('express');
const users = require('./lib/routes/track');

const app = express();

// register routes under resource path
app.use('/track', users);

// start server on host:port
var port = config.express.port;
var host = config.express.host;
app.listen(port, host, function () {
  log.info('IBB server app listening on %s:%s.', host, port);
});
