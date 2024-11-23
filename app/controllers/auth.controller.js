const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Todos los campos son obligatorios." });
  }
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: "Error! Email en uso." });
    }
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    await user.save();
    res.status(201).send({ message: "Usuario registrado exitosamente." });
  } catch (err) {
    res.status(500).send({ message: "Error al registrar el usuario." });
  }
};

exports.signin = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Nombre de usuario y contraseña son requeridos." });
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).send({ message: "Usuario no encontrado." });
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ message: "Contraseña incorrecta." });
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400,
  });

  req.session.token = token;

  res.status(200).send({
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
};

exports.signout = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Cierre de sesión exitoso." });
  } catch (err) {
    res.status(500).send({ message: "Error al cerrar sesión." });
  }
};
