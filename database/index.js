'use strict';

const mysqllib = require('./mysqllib');
const redisLib = require('./redislib')
const dbProperties = require('./dbproperties.js');

async function initialize(apiReference) {
  global.mysqlCon = await mysqllib.initialize(apiReference, dbProperties.mysql.master);
  global.redisCon = await redisLib.initialize(apiReference, dbProperties.redis);
}

exports.initialize = initialize;