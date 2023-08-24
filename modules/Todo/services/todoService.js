const todoDao = require('../dao/todoDao.js');
const logging = require('../../../logging/logging.js');

exports.getAllTodos = async (apiReference, opts) => {
    let response = { success: false };
    logging.log(apiReference, { EVENT: "In Service file" });
    let fetchResponse = todoDao.getAllTodos(apiReference, opts);
    logging.log(apiReference, { EVENT: "Getting todos !", RESPONSE: fetchResponse });
    if (!fetchResponse.success) {
        return fetchResponse;
    }
    fetchResponse = fetchResponse.data[0];

    response.success = true;
    response.data = fetchResponse;
    return fetchResponse;
};

exports.createTodo =async (apiReference, opts) => {
    const response = {success : false }
    logging.log(apiReference, { EVENT: "Creating New Todo", OPTS: opts });
    let createResp = await todoDao.createTodo(apiReference, opts);
    logging.log(apiReference, { EVENT: "Creating New", RESPONSE: createResp });
    response.success = true;
    // response.data =createResp ;
    return response;
};

exports.updateTodo = async (apiReference, opts) => {
    let response = { success: false };
    logging.log(apiReference, { EVENT: "Update todo", OPTS: opts });
    let updateToken = false;
    let fetchUserResponse = await todoDao.updateTodo(apiReference, opts);
    logging.log(apiReference, { EVENT: "Updating todo", RESPONSE: fetchUserResponse });
    updateToken = true;
    response.success = true;
    response.data = fetchUserResponse;
    return response;
}


exports.deleteTodoById = async (apiReference, opts) => {
    let response = { success: false };
    logging.log(apiReference, { EVENT: "deleteTodo Service", OPTS: opts });
    let updateResponse = await todoDao.deleteTodoById(apiReference,opts);
    logging.log(apiReference, { EVENT: "delete User Details", RESPONSE: updateResponse });
    if (!updateResponse.success) {
      return updateResponse;
    }
    response.success = true;
    return response;
  };
  