const createError = require("http-errors");
const { isAfter, addMinutes } = require("date-fns");

const findWithId = require("../services/findItem");
const AdminAttendance = require("../models/AdminAttendanceModel");
const StudentAttendance = require("../models/StudentAttendanceModel");
const { successResponse } = require("./responseController");

// get attendance by id
const handleGetAttendance = async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError(401, "User not authenticated");
    }

    const { id } = req.params;
    if (!id) {
      throw createError(400, "Attendance ID is required");
    }

    // const adminAttendance = await findWithId(AdminAttendance, id);
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) {
      throw createError(404, "Invalid Attendance ID");
    }

    if (adminAttendance.status === "COMPLETED") {
      throw createError(400, "Attendance Completed Already");
    }

    // check if student already input the attendance

    let attendance = await StudentAttendance.findOne({
      user: req.user._id,
      adminAttendance: id,
    });

    if (attendance) {
      throw createError(400, "Already input attendance");
    }

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    await attendance.save();
    return successResponse(res, {
      statusCode: 200,
      message: "Successful",
      payload: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// get attendance status
const handleGetAttendanceStatus = async (req, res, next) => {
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

module.exports = { handleGetAttendance, handleGetAttendanceStatus };
