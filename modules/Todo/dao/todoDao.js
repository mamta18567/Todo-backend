const dbHandler = require('../../../database/mysqllib')
const logging = require('../../../logging/logging');
const constants = require('../../../responses/responseConstants.js')

exports.getAllTodos = async (apiReference,opts) => {
    let response = { success: false };
    let query = `SELECT * FROM todos`;
    let values = [];
    if(opts.limit){
        query += "  LIMIT ?";
        values.push(Number(opts.limit));
        query += " OFFSET ?";
        values.push(Number(opts.skip));
    }

    let queryResponse = await dbHandler.executeQuery(apiReference, 'getList', query, values);

    if (queryResponse.ERROR) {
        response.data = queryResponse.ERROR;
        return response;
    }
    logging.log(apiReference, { EVENT: "get List - mysqlDao", RESPONSE: queryResponse });
    response.success = true;
    response.data = queryResponse;
    return response;
};

exports.createTodo = async (apiReference, opts, whereOpts) => {
    let response = { success: false };
    logging.log(apiReference, { "EVENT": "Creating New List DAO", opts, whereOpts });
    let query = `INSERT INTO todos SET ?`;
    let queryResponse = await dbHandler.executeQuery(apiReference, "New Details", query , opts);
    if (queryResponse.ERROR){
        response.success = false;
        response.error   = queryResponse.ERROR;
        if (queryResponse.ERROR == "ER_DUP_ENTRY"){
          response.error   = constants.responseMessages.USER_ALREADY_REGISTERED;
        }
        return response;
      }
      response.success = true;
      response.data    = queryResponse;
      return response;
};


exports.updateTodo = async (apiReference, opts, whereOpts) => {
    let response = { success: false };
    logging.log(apiReference, { "EVENT": "updateDetails DAO", opts, whereOpts });
    const query = `UPDATE todos SET ? WHERE id = ?`;
    let queryResponse = dbHandler.executeQuery(apiReference, "update Details", query, opts);
    if (queryResponse.ERROR){
        response.success = false;
        response.error   = queryResponse.ERROR;
        if (queryResponse.ERROR == "ER_DUP_ENTRY"){
          response.error   = constants.responseMessages.USER_ALREADY_REGISTERED;
        }
        return response;
      }
      response.success = true;
      response.data    = queryResponse;
      return response;
};

exports.deleteTodoById = async (apiReference, opts, whereOpts) => {
    let response = { success : false };
    logging.log(apiReference, {"EVENT" : "Delete Details DAO", opts, whereOpts});
  
    let query = `DELETE from todos WHERE id = ?`;
    let values = [opts];
    let queryResponse = await dbHandler.executeQuery(apiReference, "delete Details", query, values);
    if (queryResponse.ERROR){
      response.success = false;
      response.error   = queryResponse.ERROR;
      if (queryResponse.ERROR == "ER_DUP_ENTRY"){
        response.error   = constants.responseMessages.USER_ALREADY_REGISTERED;
      }
      return response;
    }
    if (!queryResponse.affectedRows){
      response.success = false;
      response.error   = constants.responseMessages.USER_NOT_FOUND;
      return response;
    }
    response.success = true;
    response.data    = queryResponse;
    return response;
  };
  