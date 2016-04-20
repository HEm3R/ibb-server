/**
 * track.js
 *
 * Route handling /track http endpoint.
 */

'use strict';

const express = require('express');
const getTrack = require('./track/get');

const router = express.Router();
router.get('/', getTrack);

module.exports = router;
