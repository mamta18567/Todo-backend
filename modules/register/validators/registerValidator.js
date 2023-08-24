const Joi                             = require('joi');
const constants                       = require('../../../responses/responseConstants');
const validator                       = require('../../../validators/joiValidators');
const apiReferenceModule              = constants.modules.REGISTER;
const emptyHeaderStructure            = Joi.object().keys({
});

/**
 * @param req = Request from external
 * @param res = Response
 * @param next = next of function
 */

const register = async (req, res, next) => {
  req.apiReference = {
    module: apiReferenceModule,
    api   : "register"
  };
  
  let schema =  Joi.object().keys ({
    username : Joi.string().required(),
    password : Joi.string().required(),
    email_id : Joi.string().required()
  });
  let reqBody = { ... req.body };
  let request = { ... req };
  
  let validFields = await validator.validateFields(req.apiReference, request, reqBody, res, schema, emptyHeaderStructure);
  if (validFields) {
    next();
  }
};

exports.register                 = register;
