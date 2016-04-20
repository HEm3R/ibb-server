/**
 * file-storage.js
 *
 * Simple data storage appending records to a file. Each app component can use different file for storing therefore
 * FileStorage cannot be designed as singleton service.
 */

'use strict';

const log = require('../log');
const fs = require('fs');

/**
 * @param {string} file - the name of file to store records
 * @constructor
 */
function FileStorage(file) {
  this.file = file;
}

/**
 * Appends the provided record to file.
 *
 * @param {string} record - the record to append to file
 * @return {void}
 */
FileStorage.prototype.append = function(record) {
  log.info('action=append_to_file status=START record=%s', record);
  fs.appendFile(this.file, record + '\n', 'utf8', (err) => {
    if (err) {
      throw err;
    }
    log.info('action=append_to_file status=FINISH record=%s', record);
  });
};

module.exports = FileStorage;
