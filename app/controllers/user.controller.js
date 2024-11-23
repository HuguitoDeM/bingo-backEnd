exports.allAccess = (req, res) => {
  res.status(200).send("Acceso publico");
};
exports.userBoard = (req, res) => {
  res.status(200).send("user Content");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Acceso publico");
};

exports.moderadorBoard = (req, res) => {
  res.status(200).send("Acceso publico");
};
