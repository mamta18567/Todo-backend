'use strict';

const config                          = require('config');

function isEnv(env) {
  return process.env.NODE_ENV == env;
}

function isEnvLiveOrBeta() {
  return isEnv('prod') || isEnv('beta');
}

function isEnvLive() {
  return isEnv('prod');
}

function getEnv() {
  return process.env.NODE_ENV;
}

function isServer(server) {
  return process.env.SERVER == server;
}

exports.port  = process.env.AUTH_PORT || config.get("PORT");

exports.isEnv             = isEnv;
exports.getEnv            = getEnv;
exports.isEnvLiveOrBeta   = isEnvLiveOrBeta;
exports.isEnvLive         = isEnvLive;
exports.isServer          = isServer;
