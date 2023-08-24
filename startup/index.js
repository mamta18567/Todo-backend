'use strict';

const logging                 = require('../logging/logging');
const database                = require('../database/dbproperties');
const httpLib                 = require('../services/httpService.js');
const envProperties           = require('../properties/envProperties');


const conDb = require('../database/index');


const initializeServer = async () => {
  try {
    let apiReference={
      module: "startup",
      api: "initialize"
    }
    //initialize all db connections
    const server = await httpLib.startHttpServer(envProperties.port);
    await conDb.initialize(apiReference);
  } catch (error) {
    throw new Error(error);
  }
};

exports.initializeServer  = initializeServer;
