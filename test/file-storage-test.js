'use strict';

const expect = require('chai').expect;
const fs = require('fs');

describe('file-storage', function() {

  const FileStorage = require('../lib/storage/file-storage');
  const file = 'test/test.txt';

  beforeEach(function() {
    fs.unlink(file);
  });

  after(function() {
    fs.unlink(file);
  });

  it('should append record to file', function(done) {
    var storage = new FileStorage(file);

    storage.append('A');
    storage.append('B');

    fs.readFile(file, 'utf-8', function(err, data) {
      expect(data).to.equal('A\nB\n');
    });

    done();
  });
});
