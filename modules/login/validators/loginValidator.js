'use strict';

const Joi = require('joi');
const constants = require('../../../responses/responseConstants');
const validator = require('../../../validators/joiValidators.js');
const apiReferenceModule = constants.modules.LOGIN;

const emptyHeaderStructure = Joi.object().keys({});

/**
 * @param req = Request from external
 * @param res = Response
 * @param next = next of function
 */
const login = async (req, res, next) => {
    req.apiReference = {
        module: apiReferenceModule,
        api: "login"
    };

    const schema = Joi.object().keys({
        username : Joi.string().required(),
        password : Joi.string().required(),
        email_id: Joi.string().required()
    })

    let reqBody = { ...req.body };
    let request = { ...req, headers: req.headers };

    let validFields = await validator.validateFields(req.apiReference, request, reqBody, res, schema, emptyHeaderStructure);
    if (validFields) {
        next();
    }
};

exports.login = login;