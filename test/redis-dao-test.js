'use strict';

const expect = require('chai').expect;
const mockery = require('mockery');
const redisMock = require('redis-mock');

describe('redis-dao', function() {

  var redisDao;

  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('config', {redis:{host:'', port: 0}});
    mockery.registerMock('redis', redisMock);
    redisDao = require('../lib/redis/redis-dao');
  });

  after(function() {
    mockery.disable();
  });

  it('null value should be returned for undefined key', function(done) {
    redisDao.get('undefined', function(value) {
      expect(value).to.be.null;
    });

    done();
  });

  it('set value should be returned', function(done) {
      var k = 'key';
      var v = 'value';
      redisDao.set(k, v);

      redisDao.get('key', function(value) {
        expect(value).to.equal(v);
      });

      done();
    });
});
