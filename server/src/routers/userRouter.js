const {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleCreateUser,
  handleUpdateUserWithPatch,
  handleUpdateUserWithPut,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/", handleGetAllUsers);
userRouter.get("/:id", handleGetUserById);
userRouter.post("/", handleCreateUser);
userRouter.patch("/:id", handleUpdateUserWithPatch);
userRouter.put("/:id", handleUpdateUserWithPut);
userRouter.delete("/:id", handleDeleteUserById);

module.exports = userRouter;
