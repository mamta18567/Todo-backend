'use strict';

require('./Todo');
require('./register');
require('./login');
require('./sendMail');
require('./twilio');

app.use(process.env.PATH_ALIAS || '/', router);