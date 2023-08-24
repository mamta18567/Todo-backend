const twiioService = require('../../twilio/services/twilioService')
const logging = require('../../../logging/logging');
const responses = require('../../../responses/responses')

exports.sendMsg = async (req, resp) => {
    let apiReference = {
        module: "twilio",
        api: "sendMessage"
    }
    try {
        const result = await twiioService.sendMsg(apiReference);
        logging.log(apiReference, { EVENT: "Sending SMS", serviceResponse: result });
        if (responses.success) {
            return responses.success(resp, result);
        }
        return responses.failure(resp, {}, result.error);
    } catch (error) {
        logging.logError(apiReference, { EVENT: "Error in Sending Msg", ERROR: error, STACK: error.stack });
        return responses.internalServerError(resp);
    }
};