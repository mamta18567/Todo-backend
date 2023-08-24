'use strict';

const logging = require("../../../logging/logging");
const registerDao = require('../dao/registerDao');
const pwdService = require('../../../services/pwdService')
const mailController = require('../../sendMail/controllers/mailController');
const constants = require('./../../../responses/responseConstants');

exports.register = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { EVENT: "Register User Service", OPTS: opts });

  let fetchUserResponse = await registerDao.fetchDetails(apiReference, opts);
  logging.log(apiReference, { EVENT: "Fetch User Details", RESPONSE: fetchUserResponse });

  if (!fetchUserResponse.success) {
    return fetchUserResponse;
  }


  if (fetchUserResponse.data.length != 0) {
    response.is_duplicate = true;
    return response;
  }

  if (opts.password) {
    opts.password = pwdService.encrypt(opts.password);
  }
  let insertObj = {
    ...opts,
  };

  
  let insertDaoResponse = await registerDao.insertDetails(apiReference, insertObj);
  logging.log(apiReference, { EVENT: "Insert User Details", RESPONSE: insertDaoResponse });
  
  if (!insertDaoResponse.success) {
    response.is_duplicate = insertDaoResponse.is_duplicate;
    return response;
  }
  
  let sendMail =  await mailController.sendMail(opts.email_id);
  response.success = true;
  return response;
};



