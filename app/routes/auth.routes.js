const checkDuplicateUsernameOrEmail = require("../middlewares");

const controllers = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.post(
    "/api/auth/singup",
    [checkDuplicateUsernameOrEmail],
    controllers.signup
  );
  app.post("/api/auth/singin", controllers.signin);
  app.post("/api/auth/singout", controllers.signout);
};
