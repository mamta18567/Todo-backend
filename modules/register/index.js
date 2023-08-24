'use strict';

const registerValidator = require('./validators/registerValidator');
const registerController = require('./controllers/registerController');

router.post("/user/register", registerValidator.register, registerController.register);