import userModel from "../models/userModel";

class UserController {
  constructor() {
    this.model = new userModel();
  }

  create(req, res) {
    const { username, password } = req.body;
    try {
      this.model.create({ username, password });
      res.send("Usuario Creado con Exito");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
