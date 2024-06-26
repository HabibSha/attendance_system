const bcrypt = require("bcrypt");
const createError = require("http-errors");

const User = require("../models/UserModel");
const { successResponse } = require("./responseController");
const createJSONWebToken = require("../helper/jsonwebtoken");
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../helper/cookie");
const { userRegisterService } = require("../services/authService");

const jwtAccessKey = "alskjfaksdfjasl;dfk";
const jwtRefreshKey = "alskdnahvntlkasudfo";

// create an user with registration
const handleProcessRegister = async (req, res, next) => {
  try {
    const { name, email, password, roles, accountStatus } = req.body;

    // userRegisterService function from service folder's authService file
    const newUser = await userRegisterService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "User was created successfully",
      payload: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// login user
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        404,
        "User does not exist with this email. Please register first"
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Invalid user credentials");
    }

    // token, keep the token in the cookie
    // create jwt for access token
    const accessToken = createJSONWebToken({ user }, jwtAccessKey, "5m");
    setAccessTokenCookie(res, accessToken);

    // create jwt for refresh token
    const refreshToken = createJSONWebToken({ user }, jwtRefreshKey, "7d");
    setRefreshTokenCookie(res, refreshToken);

    // hiding password from result
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully",
      payload: { userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleProcessRegister, handleLogin };
