"use strict";

const bcrypt = require('bcrypt');

const encrypt = (pwd) => {
  return bcrypt.hashSync(pwd, 10);
};

const compare = (pwd, hash) => {
  return bcrypt.compareSync(pwd, hash)
};


exports.encrypt           = encrypt;
exports.compare           = compare;