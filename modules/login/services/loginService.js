'use strict';

const logging = require('../../../logging/logging');
const responseConstants = require('../../../responses/responseConstants');
const registerDao = require('../../register/dao/registerDao');
const pwdService = require('../../../services/pwdService');
const jwtService = require('../../../services/jwtService')

exports.login = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Login User Service", OPTS: opts });

  let loginInfo = await registerDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch User Details", RESPONSE: loginInfo });

  if (!loginInfo.success) {
    return loginInfo;
  }

  loginInfo = loginInfo.data[0];

  const passComp = await pwdService.compare(opts.password, loginInfo.password);

  if (!passComp) {
    response.error = responseConstants.responseMessages.INVALID_CREDENTIALS;
    return response;
  }

  let tokenResponse = await module.exports.createJwtToken(apiReference, opts, loginInfo);
  if (!tokenResponse.success) {
    return tokenResponse;
  }

  loginInfo["access-token"] = tokenResponse.data;
  response.success = true;
  response.data = tokenResponse;
  return response;
};

exports.createJwtToken = async (apiReference, opts, userDetails, time) => {
  logging.log(apiReference, { EVENT: "createJwtToken service", opts, userDetails, time });
  let response = { success: false };
  let tokenKey = userDetails.user_id;
  let tokenResponse = await jwtService.setupJWTToken(apiReference, { fetchResponse: userDetails, tokenKey }, time);
  response.success = true;
  response.data = tokenResponse;
  return response;
}
