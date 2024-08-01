const userRouter = require("express").Router();
const {
  registerUser,
  userVerification,
  resendVarify,
  userLogin,
  deleteUser,
  updatePassWord,
  resetPassword,
  updateProfile,
retreiveProfile
 
} = require("../controllers/users");

userRouter;
userRouter.route("/user/registerUser").post(registerUser);
userRouter.route("/user/verify").post(userVerification);
userRouter.route("/user/resendVarify").post(resendVarify);
userRouter.route("/user/userLogin").post(userLogin);
userRouter.route("/user/deleteUser").post(deleteUser);
userRouter.route("/user/updatePassWord").post(updatePassWord);
userRouter.route("/user/updatePassWord").post(updatePassWord);
userRouter.route("/user/resetPassword").post(resetPassword);
userRouter.route("/user/updateProfile").post(updateProfile);
userRouter.route("/user/retreiveProfile").post(retreiveProfile);



module.exports = userRouter;