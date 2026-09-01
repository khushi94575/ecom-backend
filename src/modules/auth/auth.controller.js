const {
  refreshCookieOptions,
  accessCookieOptions,
  signRefreshToken,
  signAccessToken,
} = require("../../utils/token");

const apiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const AuthService = require("./auth.service");
const { refreshModel } = require("../../models/refresh.model");
const { OK, NOT_FOUND } = require("../../utils/httpStatus");
const { apiError } = require("../../utils/apiError");

const generateToken = (res, user) => {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  res.cookie("accessToken", accessToken, accessCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return {
    accessToken,
    refreshToken,
  };
};

const registerController = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userData = await AuthService.register({
    name,
    email,
    password,
    role,
  });

  const tokens = generateToken(res, userData.user);

  const refreshTokenData = await AuthService.createRefreshToken({
    userId: userData.user._id,
    token: tokens.refreshToken,
  });

  return res.status(201).json(
    apiResponse(
      201,
      {
        user: userData.user,
        accessToken: tokens.accessToken,
        refreshToken: refreshTokenData,
      },
      "User created successfully",
    ),
  );
});

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await AuthService.login({
    email,
    password,
  });

  const tokens = generateToken(res, result.user);

  const refreshTokenData = await AuthService.createRefreshToken({
    userId: result.user._id,
    token: tokens.refreshToken,
  });

  return res.status(200).json(
    apiResponse(
      200,
      {
        user: result.user,
        accessToken: tokens.accessToken,
        refreshToken: refreshTokenData,
      },
      "Login successful",
    ),
  );
});

const logoutController = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", accessCookieOptions);
  res.clearCookie("refreshToken", refreshCookieOptions);
  await refreshModel.deleteMany;
  res.status;
});
const changePasswordController = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const result = await AuthService.changePasswordService({
    userId: req.user._id,
    oldPassword: oldPassword,
  });
  res.status(OK).json(apiResponse(OK, result, "password changed successfully"));
});

const changeController = asyncHandler(async (req, res) => {});
const refreshController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw apiError(NOT_FOUND, "refresh token not found");
  }
});

const meController = asyncHandler(async (req, res) => {});

const authcontroller = {
  registerController,
  loginController,
  refreshController,
  meController,
  changeController,
  logoutController,
  changePasswordController
};

module.exports = { authcontroller };
