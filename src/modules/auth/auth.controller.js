const apiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const { refreshCookieOptions } = require("../../utils/token");
const AuthService = require("./auth.service");
const registerController = asyncHandler(async (req, res) => {
  //trycatch --> asyncHandler
  //req.body
  //user.exist?
  //hash password
  //token gerneration
  //response -->apiResponse
  const { name, email, password, role } = req.body;
  const result = await AuthService.register({
    name,
    email,
    password,
    role,
  });
  res.cookie(result.tokens, refreshCookieOptions);
  res
    .status(201)
    .json(apiResponse(201, result.user, "user creted successfully"));
});

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.login({ email, password });
  res.cookie("refreshToken", result.tokens.refresh, refreshCookieOptions);
  res.status(200).json(apiResponse(200, result, "login Successfully"));
};
const refreshController = async (req, res) => {};
const logoutController = async (req, res) => {};
const meController = async (req, res) => {};
const changeController = async (req, res) => {};
const authcontroller = {
  registerController,
  loginController,
  refreshController,
  meController,
  changeController,
  logoutController,
};
module.exports = { authcontroller };
