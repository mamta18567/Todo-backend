"use strict";

const logging                       = require('../../../logging/logging');
const responses                     = require('../../../responses/responses');
const registerService               = require('../services/registerService');
const constants                     = require('./../../../responses/responseConstants');

exports.register = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };

  try {
    const response = await registerService.register(apiReference, requestBody);

    logging.log(apiReference, { serviceResponse: response });
    if (response.is_duplicate) {
      return responses.alreadyExists(res);
    }

    if (response.success) {
      return responses.success(res, response.data,constants.responseMessages.REGISTER_SUCCESS);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Register New User ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};

exports.registerVerify = async (req, res) => {
  const apiReference  = req.apiReference;
  const requestBody   = { ... req.body };

  try {
    const response = await registerService.registerVerify(apiReference, requestBody);
    logging.log(apiReference, { serviceResponse: response });

    if (response.success) {
      return responses.success(res, response.data);
    }

    return responses.failure(res, {}, response.error);
  } catch (error) {
    logging.logError(apiReference, { EVENT: "Register Verification ERROR", ERROR: error, STACK: error.stack });
    return responses.internalServerError(res);
  }
};


