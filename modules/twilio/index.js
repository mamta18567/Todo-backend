const smsController = require('./controllers/twilioController')

router.get('/send/sms',smsController.sendMsg)