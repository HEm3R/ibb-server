/**
 * counter.js
 *
 * Counter responsible for increasing count value.
 */

'use strict';

const dao = require('../redis/redis-dao');

const key = 'count';
const init = 1;

/**
 * Increases the counter value.
 *
 * @return {void}
 */
function increase() {
  dao.get(key, function(value) {
    if (!value) {
      dao.set(key, init);
    } else {
      dao.set(key, ++value);
    }
  });
}

module.exports = {
  increase: increase
};
