const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  avatar: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
