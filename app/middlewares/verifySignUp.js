const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(400).send({ message: "Error! Username ya existe." });
    }

    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).send({ message: "Error! Email en uso." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = checkDuplicateUsernameOrEmail;
