const checkDuplicateUsernameOrEmail = require("./verifySignUp");
const authJwt = require("./authJwt");

module.exports = {
  authJwt,
  checkDuplicateUsernameOrEmail,
};
