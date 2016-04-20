'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const mockery = require('mockery');
const fs = require('fs');

describe('get-track-route-handler', function() {

  var getTrack;

  const sandbox = sinon.sandbox.create();
  const counterStub = {
    increase: sandbox.stub()
  };
  const responseStub = {
    end: sandbox.stub()
  };

  const file = 'test/test.txt';

  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('config', {fileStorage: {file: file}});
    mockery.registerMock('../../logic/counter', counterStub);

    getTrack = require('../lib/routes/track/get');
  });

  after(function() {
    mockery.disable();
    fs.unlink(file);
  });

  beforeEach(function() {
    responseStub.end.reset();
    counterStub.increase.reset();
    fs.unlink(file);
  });

  it('params should be stored and counter should not be increased', function(done) {
    const request = {
      query: {
        param: 'value'
      }
    };

    getTrack(request, responseStub);
    fs.readFile(file, 'utf-8', function(err, data) {
      expect(data).to.equal('{"param":"value"}\n');
    });
    sinon.assert.notCalled(counterStub.increase);
    sinon.assert.calledOnce(responseStub.end);
    done();
  });

  it('params should be stored and counter should be increased', function(done) {
      const request = {
        query: {
          count: true
        }
      };

      getTrack(request, responseStub);
      fs.readFile(file, 'utf-8', function(err, data) {
        expect(data).to.equal('{"count":true}\n');
      });
      sinon.assert.calledOnce(counterStub.increase);
      sinon.assert.calledOnce(responseStub.end);
      done();
    });
});
