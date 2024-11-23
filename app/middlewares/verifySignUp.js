const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (user) {
      return res.status(400).send({ message: "Error! Username ya existe." });
    }

    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (user) {
        return res.status(400).send({ message: "Error! Email en uso." });
      }
      next();
    });
  });
};

module.exports = { checkDuplicateUsernameOrEmail };
