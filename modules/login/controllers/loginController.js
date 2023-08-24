'use strict'
const logging = require('../../../logging/logging');
const responses = require('../../../responses/responses');
const loginService = require('../services/loginService');

exports.login = async (req, res) => {
    const apiReference = req.apiReference;
    const requestBody = { ...req.body };

    try {
        const response = await loginService.login(apiReference, requestBody);
        logging.log(apiReference, { finalResponse: response });
        if (response.success) {
            return responses.success(res, response.data);
        }

        return responses.failure(res, response.data || {}, response.error);
    } catch (error) {
        logging.logError(apiReference, { EVENT: "login With Password ERROR", ERROR: error, STACK: error.stack });
        return responses.internalServerError(res);
    }
};