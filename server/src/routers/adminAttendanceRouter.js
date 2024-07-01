const adminAttendanceRouter = require("express").Router();

const {
  handleGetEnable,
  handleGetStatus,
  handleGetDisable,
} = require("../controllers/adminAttendanceController");

adminAttendanceRouter.get("/enable", handleGetEnable);
adminAttendanceRouter.get("/status", handleGetStatus);
adminAttendanceRouter.get("/disable", handleGetDisable);

module.exports = adminAttendanceRouter;
