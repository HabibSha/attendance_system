const {
  handleProcessRegister,
  handleLogin,
} = require("../controllers/authController");

const authRouter = require("express").Router();

authRouter.post("/process-register", handleProcessRegister);
authRouter.post("/login", handleLogin);

module.exports = authRouter;
