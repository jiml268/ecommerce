const userRouter = require("express").Router();
const {
  registerUser,
  userVerification,
  resendVarify
 
} = require("../controllers/users");

userRouter;
userRouter.route("/user/registerUser").post(registerUser);
userRouter.route("/user/verify").post(userVerification);
userRouter.route("/user/resendVarify").post(resendVarify);


module.exports = userRouter;