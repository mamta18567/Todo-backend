const todoService = require('../services/todoService');
const logging = require('../../../logging/logging.js')
const responses = require('../../../responses/responses');

exports.getList = async (req, resp) => {
    let apiReference = {
        module: "Todo",
        api: "getList"
    }
    const requestBody = { ...req.query };
    try {
        const result = await todoService.getAllTodos(apiReference, requestBody);
        logging.log(apiReference, { EVENT: "Get User Details", serviceResponse: result });
        if (responses.success) {
            return responses.success(resp, result.data);
        }
        return responses.failure(resp, {}, result.error);
    } catch (error) {
        logging.logError(apiReference, { EVENT: "get profile ERROR", ERROR: error, STACK: error.stack });
        return responses.internalServerError(resp);
    }
};

exports.createList = async (req, res) => {
    let apiReference = {
        module: "Todo",
        api: "createList"
    }
    try {
        const requestBody = { ...req.body }
        let response = await todoService.createTodo(apiReference, requestBody);
        logging.log(apiReference, { serviceResponse: response });
        if (response.success) {
            return responses.success(res, response.data);
        }
        return responses.failure(res, {}, response.error);
    } catch (error) {
        logging.logError(apiReference, { EVENT: "Creating to-do list ERROR", ERROR: error, STACK: error.stack });
        return responses.internalServerError(res);
    }
}

exports.updateList = async (req, res) => {
    let apiReference = {
        module: "Todo",
        api: "updateList"
    }
    try {
        const { firstName, lastName, id} = req.body
        const requestBody = [{ firstName, lastName }, id]
        let response = todoService.updateTodo(apiReference, requestBody);
        logging.log(apiReference, { serviceResponse: response });
        if (response.success) {
            return responses.success(res, response.data);
        }
        return responses.failure(res, {}, response.error);
    } catch (error) {
        logging.logError(apiReference, { EVENT: "updating to do list ERROR", ERROR: error, STACK: error.stack });
        return responses.internalServerError(res);

    }
}

exports.deleteTodo = async (req, res) => {
    let apiReference = {
        module: "Todo",
        api: "deleteTodo"
    }

    try {
        const requestBody = req.body.id;
        let response = await todoService.deleteTodoById(apiReference, requestBody);
        logging.log(apiReference, { serviceResponse: response });
        if (response.success) {
            return responses.success(res, response.data);
        }
        return responses.failure(res, {}, response.error);
    } catch (error) {
        logging.logError(apiReference, { EVENT: "deleteTodo ERROR", ERROR: error, STACK: error.stack });
        return responses.internalServerError(res);
    }
}