'use strict';
const loginValidator = require('./validators/loginValidator.js');
const loginController = require('./controllers/loginController.js')

router.post('/user/login',loginValidator.login,loginController.login)