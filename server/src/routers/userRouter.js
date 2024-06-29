const {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/", handleGetAllUsers);
userRouter.get("/:id", handleGetUserById);
userRouter.delete("/:id", handleDeleteUserById);

module.exports = userRouter;
