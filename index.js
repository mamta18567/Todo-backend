'use strict';

process.env.NODE_CONFIG_DIR       = 'config/';
const express                     = require('express');
const router                      = express.Router();
const app                         = express();
const config = require('config');


global.app                        = app;
global.router                     = router;

require('./middlewares');
require('./modules');
require('./startup').initializeServer();

module.exports = router;
module.exports = app;