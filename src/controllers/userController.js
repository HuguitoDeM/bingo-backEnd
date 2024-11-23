import { UserModel } from "../models/userModel.js";

class UserController {
  constructor() {
    this.model = new UserModel();
  }

  async createUser(req, res) {
    try {
      const { username, password } = req.body;
      if (username.length < 3) {
        return res.status(400).json({
          message: "Nombre de usuario menor de 3 caracteres no permitido",
        });
      }
      if (password.length < 6) {
        return res.status(400).json({
          message: "contraseña de usuario menor de 6 caracteres no permitido",
        });
      }
      const newUser = await this.model.createUser({ username, password });
      return res.status(201).json({
        message: "Usuario creado exitosamente",
        user: { id: newUser.id, username: newUser.username },
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Nombre de usuario y contraseña son requeridos" });
      }

      const user = await this.model.loginUser(username, password);
      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        user: { id: user.id, username: user.username },
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new UserController();
