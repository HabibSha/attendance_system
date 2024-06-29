const {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleCreateUser,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/", handleGetAllUsers);
userRouter.get("/:id", handleGetUserById);
userRouter.post("/", handleCreateUser);
userRouter.delete("/:id", handleDeleteUserById);

module.exports = userRouter;
