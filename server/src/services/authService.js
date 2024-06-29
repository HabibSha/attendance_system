const createError = require("http-errors");
const User = require("../models/UserModel");

const userRegisterService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  const userExists = await User.exists({ email });
  if (userExists) {
    throw createError(400, "User with this email already exists. Please login");
  }
  const newUser = new User({
    name,
    email,
    password,
    roles: roles ? roles : "STUDENT",
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });

  return newUser.save();
};

module.exports = { userRegisterService };
