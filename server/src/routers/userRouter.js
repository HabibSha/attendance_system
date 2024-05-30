const { processRegister } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/process-register", processRegister);

module.exports = userRouter;
