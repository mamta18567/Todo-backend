'use strict';

const jwt = require('jsonwebtoken');
const secretOrPrivateKey = "creatingjwtToken";
const redisService = require('../database/redislib');
const logging = require("../logging/logging");


const createJWT = (apiReference, opts, expiryTime) => {
  const values = { ...opts };
  logging.log(apiReference, {
    EVENT: "!! CREATING JWT !! ",
    OPTS: opts
  });
  return jwt.sign(values, secretOrPrivateKey, { expiresIn: expiryTime || "2 days" })
};

const verifyJWT = (apiReference, token) => {
  logging.log(apiReference, { EVENT: "VERIFY JWT", TOKEN: token });
  let decoded;
  try {
    decoded = jwt.verify(token, secretOrPrivateKey);
  } catch (err) {
    console.error("Invalid token!!", token, err);
  }
  logging.log(apiReference, { EVENT: "!! DECODED JWT !! ", OPTS: decoded });
  return decoded;
};


const saveToCache = async (apiReference, key, value) => {
  let result = await redisService.set(apiReference, key, value);
  logging.log(apiReference, { EVENT: "saveToCache", VAL: result });
  return result;
};
exports.setupJWTToken = async (apiReference, opts, time) => {
  logging.log(apiReference, { EVENT: "fetchingDetails >> setupJWTToken :: ", OPTS: opts });
  time = time || "30 days"
  const accessToken = await createJWT(apiReference, opts.fetchResponse, time);
  saveToCache(apiReference, opts.tokenKey, accessToken);
  return accessToken;
};


exports.createJWT = createJWT;
exports.verifyJWT = verifyJWT;
