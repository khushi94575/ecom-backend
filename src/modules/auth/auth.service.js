const userModel = require("../../models/user.model");
const { apiError } = require("../../utils/apiError");
const authModule = require("./auth.validator");
const { hashPassword, verifyPassword } = require("../../utils/password");
const { signAccessToken, signRefreshToken } = require("../../utils/token");
const { BAD_REQUEST } = require("../../utils/httpStatus");
const register = async (data) => {
  console.log(data, "body data");

  const { name, email, password, role } = data;

  const isExist = await userModel.findOne({ email });

  if (isExist) {
    return apiError(409, "user Already exist");
  }

  const hashpassword =  await hashPassword(password);

  const userData = {
    name,
    email,
    password: hashpassword,
    role,
  };

  const user = await userModel.create(userData);

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  return {
    user,
    tokens: {
      access: accessToken,
      refresh: refreshToken,
    },
  };
};
const login = async (data) => {
const {email,password}=data;
const isUser=await userModel.findOne({email});
if(!isUser){
throw apiError(BAD_REQUEST,"Incorrect Credentials")
};
const isPasswordCorrect= await verifyPassword(password,isUser.password);
if(!isPasswordCorrect){
    throw apiError(BAD_REQUEST,"Incorrect Credentials");
}
  const accessToken = signAccessToken(isUser);
  const refreshToken = signRefreshToken(isUser);
  return {
    user: isUser,
    tokens: {
      access: accessToken,
      refresh: refreshToken,
    },
  };
};
const logout = async () => {};
const refresh = async () => {};
const me = async () => {};
const changepassword = async () => {};
module.exports = {
  register,
  login,
  logout,
  refresh,
  me,
  changepassword,
};