const logging = require('../../../logging/logging');
const dbHandler = require('../../../database/mysqllib');
const constants = require('./../../../responses/responseConstants');

exports.insertDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { "EVENT": "insertDetails DAO", opts });
  let query = `INSERT INTO user_credentials SET ?`;
  let values = [opts];
  let queryResponse = await dbHandler.executeQuery(apiReference, "insert Details", query, values);
  logging.log(apiReference, { EVENT: "executeQuery Result", RESULT: queryResponse });
  if (queryResponse.ERROR) {
    if (queryResponse.ERROR == "ER_DUP_ENTRY") {
      response.success = false;
      response.is_duplicate = true;
      response.error = constants.responseMessages.USER_ALREADY_REGISTERED;
    }
    return response;
  }
  response.success = true;
  response.data = queryResponse;
  return response;
};

exports.fetchDetails = async (apiReference, opts) => {
  let response = { success: false };
  logging.log(apiReference, { "EVENT": "fetchDetail DAO", opts });
  let query = `SELECT * FROM user_credentials WHERE email_id = ?`;
  let values = [];
  values.push(opts.email_id)
  let queryResponse = await dbHandler.executeQuery(apiReference, "fetch Details", query, values);
  if (queryResponse.ERROR) {
    response.success = false;
    response.error = queryResponse.ERROR;
    return response;
  }
  response.success = true;
  response.data = queryResponse;
  return response;
};

