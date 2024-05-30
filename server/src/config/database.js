const mongoose = require("mongoose");

const mongodbUrl = "mongodb://localhost:27017/attendance_system";

const connectDatabase = async (options = {}) => {
  try {
    await mongoose.connect(mongodbUrl, options);
    console.log("Database connected successfully");

    mongoose.connection.on("error", (error) => {
      console.error("Database connection error: ", error);
    });
  } catch (error) {
    console.log("not connect", error.message);
  }
};

module.exports = connectDatabase;
