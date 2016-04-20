'use strict';

const sinon = require('sinon');
const mockery = require('mockery');

describe('counter', function() {

  var counter;

  const sandbox = sinon.sandbox.create();
  const daoStub = {
    get: sandbox.stub(),
    set: sandbox.stub()
  };

  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('../redis/redis-dao', daoStub);
    counter = require('../lib/logic/counter');
  });

  after(function() {
    mockery.disable();
  });

  beforeEach(function() {
    daoStub.set.reset();
  });

  it('should init value if not yet set', function(done) {
    daoStub.get.yields(null);

    counter.increase();

    sinon.assert.calledOnce(daoStub.set);
    sinon.assert.calledWith(daoStub.set, 'count', 1);
    done();
  });

  it('should increase value if already set', function(done) {
    daoStub.get.yields(1);

    counter.increase();

    sinon.assert.calledOnce(daoStub.set);
    sinon.assert.calledWith(daoStub.set, 'count', 2);
    done();
  });
});
