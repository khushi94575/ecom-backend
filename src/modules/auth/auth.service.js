const RefreshModel = require("../../models/refresh.model");
const UserModel = require("../../models/user.model");
const apiError = require("../../utils/apiError");
const { CONFLICT, BAD_REQUEST, NOT_FOUND } = require("../../utils/httpStatus");
const RefreshModel = require("../../models/refresh.model");
const UserModel = require("../../models/user.model");
const apiError = require("../../utils/apiError");
const { CONFLICT, BAD_REQUEST, NOT_FOUND } = require("../../utils/httpStatus");
const { hashPassword, verifyPassword } = require("../../utils/password");
const { signAccessToken, signRefreshToken } = require("../../utils/token");


const registerService = async (data) => {

    
    const { name, email, password, role } = data;

    const isExist = await UserModel.findOne({ email });
    if (isExist) {
        throw apiError(409, "User Already exist")
    };

    const hash = await hashPassword(password);
    const userData = {
        name: name,
        email: email,
        password: hash,
        role: role
    }

    const user = await UserModel.create(userData);
    return { user }
};

const createRefreshService = async (data) => {
    const { userId, token } = data;
    await RefreshModel.deleteMany({
        user: userId
    });

    const refreshData = await RefreshModel.create({
        user: userId,
        token: token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    return refreshData;
}

const loginService = async (data) => {
    const { email, password } = data;


    const isUser = await UserModel.findOne({ email }).select("+password");
    if (!isUser) {
        throw apiError(BAD_REQUEST, "email Incorrect Credentials")
    };

    
    const isPasswordCorrect = await verifyPassword(password, isUser.password);
    if (!isPasswordCorrect) {
        throw apiError(BAD_REQUEST, " passowrd Incorrect Credentials")
    }

    return { user: isUser }
};

const logoutService = async (user) => {

    await RefreshModel.deleteMany({
        user: user.userID
    });
};

const refreshService = async () => {

};

const changePasswordService = async (data) => {
const {userId,newPassword, oldPassword}=data;

const user= await UserModel.findById(userId).select("+password");

if(!user){
    throw apiError(NOT_FOUND,"user not found")
};

// verify oldpassword 
const decode = verifyPassword(oldPassword,user.password);

if(!decode){
    throw apiError(NOT_FOUND,"Invalid password")
}
// hash new password
const hashNewPassword = await hashPassword(newPassword);

// user me update new password field 
user.password = hashNewPassword;
await user.save();

};


const getUserDataById = async(data)=>{
    const user = await UserModel.findById(data);
    return user;
}

module.exports = {
    refreshService,
    registerService,
    loginService,
    logoutService,
    changePasswordService,
    createRefreshService,
    getUserDataById
}