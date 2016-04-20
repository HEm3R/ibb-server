/**
 * redis-dao.js
 *
 * Simple DAO for storing / retrieving records to / from redis db.
 */

'use strict';

const config = require('config');
const log = require('../log');
const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);

var host = config.redis.host;
var port = config.redis.port;
log.info('action=create_redis_client host=%s port=%s', host, port);
const client = redis.createClient({host: host, port: port});

/**
 * Gets asynchronously value for the provided key (if exists) and call the provided callback with the value.
 *
 * @param {string} key - the key of value to retrieve
 * @return {void}
 */
function get(key, callback) {
  log.info('action=get_redis_value status=START key=%s', key);
  client.getAsync(key).then(function(res) {
    log.info('action=get_redis_value status=FINISH key=%s', key);
    callback(res);
  });
}

/**
 * Gets asynchronously value for the provided key (if exists) and call the provided callback with the value.
 *
 * @param {string} key - the key of value to retrieve
 * @param {Object} value - value to be stored by the provided key
 * @return {void}
 */
function set(key, value) {
  log.info('action=set_redis_value status=START key=%s value=%s', key, value);
  client.set(key, value);
  log.info('action=set_redis_value status=FINISH key=%s value=%s', key, value);
}

module.exports = {
  get: get,
  set: set
};
