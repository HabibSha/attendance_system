const {
  handleGetAttendance,
  handleGetAttendanceStatus,
} = require("../controllers/studentAttendanceController");

const studentAttendanceRouter = require("express").Router();

studentAttendanceRouter.get("/:id", handleGetAttendance);
studentAttendanceRouter.get("/status", handleGetAttendanceStatus);

module.exports = studentAttendanceRouter;
