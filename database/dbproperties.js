'use strict';

const config = require('config');

exports.mysql = {
    master: {
        host: process.env.DB_HOST || config.get('databaseSettings.mysql.master.host'),
        user: process.env.DB_USERNAME || config.get('databaseSettings.mysql.master.user'),
        password: process.env.DB_PASSWORD || config.get('databaseSettings.mysql.master.password'),
        database: process.env.DB_NAME || config.get('databaseSettings.mysql.master.database'),
        multipleStatements: true
    }
};
exports.redis = {
    port: process.env.REDIS_PORT || config.get('databaseSettings.redis.port'),
    host: process.env.REDIS_HOST || config.get('databaseSettings.redis.host'),
    password: process.env.REDIS_PWD || config.get('databaseSettings.redis.password'),
    prefix: process.env.REDIS_PFIX || config.get('databaseSettings.redis.prefix')
};