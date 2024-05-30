const express = require("express");
const createError = require("http-errors");
const { errorResponse } = require("./controllers/responseController");
const userRouter = require("./routers/userRouter");
const connectDatabase = require("./config/database");

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("Hello I am root router");
});

// Client error handling
app.use((req, res, next) => {
  next(createError(404, "Router not found!"));
});

// Server error handling -- all the errors
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDatabase();
});