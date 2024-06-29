const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const { errorResponse } = require("./controllers/responseController");
const userRouter = require("./routers/userRouter");
const connectDatabase = require("./config/database");
const authRouter = require("./routers/authRouter");

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Success" });
});

// Client error handling
app.use((_req, _res, next) => {
  next(createError(404, "Router not found!"));
});

// Server error handling -- all the errors
app.use((err, _req, res, _next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDatabase();
});
