const userRouter = require("express").Router();
const {
  registerUser,
  userVerification,
 
} = require("../controllers/users");

userRouter;
userRouter.route("/user/registerUser").post(registerUser);
userRouter.route("/user/verify").post(userVerification);

module.exports = userRouter;