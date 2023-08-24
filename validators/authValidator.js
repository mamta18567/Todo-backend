
'use strict';

const jwtService = require("../services/jwtService");
const logging = require("../logging/logging");
const responses = require("../responses/responses");

exports.authenticateUser = async (req, res, next) => {
  let apiReference = req.apiReference;
  logging.log(apiReference, { EVENT: "Inside authenticateUser" });
  await validations(req, res, next);

}

const validations = async (req, res, next) => {
  const requestHeader = { ...req.headers };
  let decodeToken = jwtService.verifyJWT(req.apiReference, requestHeader["access-token"]);
  if (!decodeToken) {
    return responses.invalidAuthKey(res);
  }
  return next();
}



