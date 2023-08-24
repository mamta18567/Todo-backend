'use strict';

const http          = require('http');


const startHttpServer = (port) => {
    return new Promise((resolve, reject) => {
      let server = http.createServer(app).listen(port, function () {
        console.log("Server Started")
        resolve(server);
      });
    });
  };

exports.startHttpServer       = startHttpServer;