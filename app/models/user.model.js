const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    inqueue: { type: Boolean, default: false },
    ingame: { type: Boolean, default: false },
    wins: { type: Number, default: 0 },
  })
);

module.exports = User;
