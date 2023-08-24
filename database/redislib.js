"use strict";

const asyncRedis        = require('async-redis');
const logging           = require('../logging/logging');
const dateUtility       = require('../utility/dateUtility');
const dbProperties      = require('./dbproperties');

let PREFIX              = dbProperties.redis.prefix;

const initialize = (apiReference, config) => {
  const client = asyncRedis.createClient({
    host                : config.host,
    port                : config.port,
    password            : config.password,
    socket_keepalive    : true
  });
  client.on("error", function (error) {
    logging.logError(apiReference, {EVENT : "REDIS ERROR OCCURRED",  ERROR : error});
  });
  PREFIX = config.prefix;
  logging.log(apiReference, "REDIS CONNECTED @ " + dateUtility.getFormattedDate(new Date(), dateUtility.formats.timeWithMilliSeconds));
  return client;
};

const get = async (apiReference, key) => {
  logging.log(apiReference, { EVENT: "GET VALUE FROM REDIS ", KEY: PREFIX + key });
  return await redisCon.get((PREFIX + key));
};

const set = async (apiReference, key, value) => {
  logging.log(apiReference, { EVENT: "SET VALUE IN REDIS ", KEY: PREFIX + key, VALUE: value });
  return await redisCon.set((PREFIX + key), value);
};

const del = async (apiReference, key) => {
  logging.log(apiReference, { EVENT: "DELETE VALUE IN REDIS ", KEY: key});
  return await redisCon.del((PREFIX + key));
};





exports.initialize          = initialize;
exports.get                 = get;
exports.set                 = set;
exports.del                 = del;


