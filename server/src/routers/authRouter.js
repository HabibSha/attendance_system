const {
  handleProcessRegister,
  handleLogin,
} = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");

const authRouter = require("express").Router();

authRouter.post("/process-register", handleProcessRegister);
authRouter.post("/login", authenticate, handleLogin);

module.exports = authRouter;
