const userModel = require("../../models/user.model");
const { apiError } = require("../../utils/apiError");
const authModule = require("./auth.validator");
const { hashPassword, verifyPassword } = require("../../utils/password");
const { signAccessToken, signRefreshToken } = require("../../utils/token");
const register = async (data) => {
  console.log(data, "body data");
  const { name, email, password ,role} = data;
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    return apiError(409, "user Already exist ");
  }
  const userData = {
    name,
    email,
    password: hash,
    role:role
  };
  const hashpassword = hashPassword(password);
  const result = await userModel.create({ userData });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  return {user,tokens:{access:accessToken,refresh:refreshToken}}
};
const login = async () => {};
const logout = async () => {};
const refresh = async () => {};
const me = async () => {};
const changepassword = async () => {};
