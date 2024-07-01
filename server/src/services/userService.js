const createError = require("http-errors");
const User = require("../models/UserModel");
const findWithId = require("./findItem");

// update user service
const updateUserService = async (req) => {
  const userId = req.params.id;
  const { email } = req.body;
  const options = { password: 0 };
  await findWithId(User, userId, options);

  const user = await User.findOne({ email });
  if (user) {
    throw createError(400, "Email is already in use");
  }

  const updateOptions = { new: true, runValidators: true, context: "query" };
  let updates = {};

  const allowedFields = ["name", "email", "roles", "accountStatus"];
  for (const key in req.body) {
    if (allowedFields.includes(key)) {
      updates[key] = req.body[key];
    }
  }

  return await User.findByIdAndUpdate(userId, updates, updateOptions).select(
    "-password"
  );
};

module.exports = { updateUserService };
