const createError = require("http-errors");

const User = require("../models/UserModel");
const { successResponse } = require("./responseController");
const findWithId = require("../services/findItem");
const { userRegisterService } = require("../services/authService");
const { updateUserService } = require("../services/userService");

// Get all users
const handleGetAllUsers = async (_req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      throw createError(404, "Users not returned");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Users were returned successfully",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

// Get single user by id
const handleGetUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const options = { password: 0 };

    const user = await findWithId(User, userId, options);

    return successResponse(res, {
      statusCode: 200,
      message: "User returned successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

// Create user by admin
const handleCreateUser = async (req, res, next) => {
  try {
    const { name, email, password, roles, accountStatus } = req.body;

    const newUser = await userRegisterService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "User was created successfully",
      payload: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// Update user with Patch method
const handleUpdateUserWithPatch = async (req, res, next) => {
  try {
    const { name, roles, accountStatus } = req.body;
    const userId = req.params.id;
    const options = { password: 0 };

    const user = await findWithId(User, userId, options);

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();

    return successResponse(res, {
      statusCode: 200,
      message: "User was updated successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user with Put method
const handleUpdateUserWithPut = async (req, res, next) => {
  try {
    const updatedUser = await updateUserService(req);
    if (!updatedUser) {
      throw createError(404, "User with this ID does not exists!");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User was updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete single user by id
const handleDeleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const options = { password: 0 };

    await findWithId(User, userId, options);

    // delete user
    await User.findByIdAndDelete({ _id: userId, isAdmin: false });

    return successResponse(res, {
      statusCode: 200,
      message: "User was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserWithPatch,
  handleUpdateUserWithPut,
  handleDeleteUserById,
};
