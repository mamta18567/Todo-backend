'use strict';

const Joi = require('joi');
const constants = require('../../../responses/responseConstants');
const validator = require('../../../validators/joiValidators');
const apiReferenceModule = constants.modules.Todo;
const emptyHeaderStructure = Joi.object().keys({});


/**
 * @param req = Request from external
 * @param res = Response
 * @param next = next of function
 */
const nameValidator = async (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api: "nameValidator"
  };
  let schema = Joi.object().keys({
    firstName: Joi.string().trim().max(10).required(),
    lastName: Joi.string().trim().max(20).required(),
    id :  Joi.number().optional()
  })
  let reqBody = { ...req.body };
  let request = { ...req };
  let validFields = await validator.validateFields(req.apiReference, request, reqBody, res, schema, emptyHeaderStructure);
  if (validFields) {
    next();
  }
};

const getList = async (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api: "getList"
  };

  let schema = Joi.object().keys({
    limit: Joi.number().optional(),
    skip: Joi.number().optional()
  });
  let reqBody = { ...req.query };
  let request = { ...req, headers: req.headers };
  let validFields = await validator.validateFields(req.apiReference, request, reqBody, res, schema);
  if (validFields) {
    next();
  }
};

const deleteTodo = async (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api: "deleteTodo"
  };
  let schema = Joi.object().keys({
    id : Joi.number().required()
  })
  let reqBody = { ...req.body };
  let request = { ...req };
  let validFields = await validator.validateFields(req.apiReference, request, reqBody, res, schema, emptyHeaderStructure);
  if (validFields) {
    next();
  }
};

exports.nameValidator = nameValidator;
exports.getList = getList
exports.deleteTodo = deleteTodo
