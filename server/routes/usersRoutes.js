const userRouter = require("express").Router();
const {
  registerUser,
  userVerification,
  resendVarify,
  userLogin,
deleteUser
 
} = require("../controllers/users");

userRouter;
userRouter.route("/user/registerUser").post(registerUser);
userRouter.route("/user/verify").post(userVerification);
userRouter.route("/user/resendVarify").post(resendVarify);
userRouter.route("/user/userLogin").post(userLogin);
userRouter.route("/user/deleteUser").post(deleteUser);



module.exports = userRouter;