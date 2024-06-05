const userRouter = require("express").Router();
const {
  registerUser,
  userVerification,
  deleteUser,
  userLogin,
  resendVarify,
  editUser,
} = require("../controllers/users");

userRouter;
userRouter.route("/user/registerUser").post(registerUser);
userRouter.route("/user/verify/:verificationToken").get(userVerification);
userRouter.route("/user/deleteUser").post(deleteUser);
userRouter.route("/user/userLogin").post(userLogin);
userRouter.route("/user/resendVarify").post(resendVarify);
userRouter.route("/user/editUser").post(editUser);

module.exports = userRouter;