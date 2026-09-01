const express = require('express')
const userController =require("./user.controller");
const validattionMiddleware = require('../../middlewares/authenticate.middleware');
const { upload } = require('../../middlewares/upload.middleware');
const verifyImageType = require('../../middlewares/verifyImage');
const UserRouter = express.Router();

UserRouter.use(validattionMiddleware);


UserRouter.get("/me",userController.getOwnProfileController);


UserRouter.patch("/me",upload.single("profilePhoto"),userController.updateOwnProfileController);


UserRouter.get("/me/addresses",userController.getAllAddressesController);

UserRouter.post("/me/addresses",userController.createAddressController);

UserRouter.patch("/me/addresses/:addrId",userController.updateAddressController);

// delete user address 
UserRouter.delete("/me/addresses/:addrId",userController.deleteAddressController);


// user status update api
UserRouter.patch("/:id/status",userController.updateUserStatusController);


// delete user api
UserRouter.delete("/:id",userController.deleteUserController);


// get all users and sellers 
UserRouter.get("/",userController.getAllusersController);


module.exports= UserRouter;