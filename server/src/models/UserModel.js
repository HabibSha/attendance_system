const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },
  roles: [String],
  accountStatus: String,
});

const User = model("User", userSchema);
module.exports = User;
