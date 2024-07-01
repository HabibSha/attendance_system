const createError = require("http-errors");
const { isAfter, addMinutes } = require("date-fns");

const AdminAttendance = require("../models/AdminAttendanceModel");

const { successResponse } = require("./responseController");

// enable attendance
const handleGetEnable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (running) {
      throw createError(400, "Already Running");
    }

    const attendance = new AdminAttendance({});
    await attendance.save();

    return successResponse(res, {
      statusCode: 201,
      message: "Successful",
      payload: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// attendance status
const handleGetStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw createError(400, "Not Running");
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Successful",
      payload: running,
    });
  } catch (error) {
    next(error);
  }
};

// disable attendance
const handleGetDisable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw createError(400, "Not Running");
    }

    running.status = "COMPLETED";
    await running.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Successful",
      payload: running,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleGetEnable, handleGetStatus, handleGetDisable };
