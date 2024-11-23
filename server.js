const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bingo-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bingo application" });
});

const PORT = process.env.port || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
