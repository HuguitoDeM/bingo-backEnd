const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const conexión = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
};

module.exports = conexión;
