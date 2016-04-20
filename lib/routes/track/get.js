/**
 * get.js
 *
 * Handler of track route for GET request.
 */

'use strict';

const config = require('config');
const log = require('../../log');
const FileStorage = require('../../storage/file-storage');
const counter = require('../../logic/counter');

const storage = new FileStorage(config.fileStorage.file);

function getTrack(req, res) {
  var params = req.query;
  log.info('action=handle_request params=%j', params);

  storage.append(JSON.stringify(params));
  if (params.count) {
    counter.increase();
  }

  res.end();
}

module.exports = getTrack;
