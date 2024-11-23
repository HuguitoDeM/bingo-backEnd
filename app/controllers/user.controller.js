module.exports.signup = (req, res) => {
  res.status(201).send({ message: "Usuario registrado con éxito!" });
};

// Función para manejar el inicio de sesión
module.exports.signin = (req, res) => {
  res.status(200).send({ message: "Usuario autenticado con éxito!" });
};

module.exports.signout = (req, res) => {
  res.status(200).send({ message: "Sesión cerrada con éxito!" });
};
