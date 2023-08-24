const mailController = require('./controllers/mailController');

router.get('/send/mail',mailController.sendMail)