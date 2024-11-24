const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./app/routes/auth.routes");

dotenv.config();
let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(
  cookieSession({
    name: "bingo-session",
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bingo application" });
});

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
