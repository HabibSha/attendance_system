const {
  handleProcessRegister,
  handleLogin,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/process-register", handleProcessRegister);
userRouter.post("/login", handleLogin);

module.exports = userRouter;
