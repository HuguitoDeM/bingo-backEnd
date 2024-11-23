import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(PORT, () => {
  console.log("Server corriendo en ", PORT);
});
