const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dotenv = require(".env");
const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const Role = db.role;
db.mongoose
  .connect(process.env.NUEVAURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

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
