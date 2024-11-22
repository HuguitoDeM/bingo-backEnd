import express from "express";
import { UserRepository } from "./src/db/user-repository";

const app = express();

app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.post("/login", (req, res) => {});
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  try {
    const id = UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.post("/logout", (req, res) => {});
app.get("/protected", (req, res) => {});

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(PORT, () => {
  console.log("Server corriendo en ", PORT);
});
