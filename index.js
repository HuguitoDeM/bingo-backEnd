import express from "express";

import UserRouter from "./src/routes/UserRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.use("/api", UserRouter);

app.listen(PORT, () => {
  console.log("Server corriendo en ", PORT);
});
