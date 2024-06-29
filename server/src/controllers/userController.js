const createError = require("http-errors");

const User = require("../models/UserModel");
const { successResponse } = require("./responseController");
const findWithId = require("../services/findItem");

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

module.exports = { handleGetAllUsers, handleGetUserById, handleDeleteUserById };
