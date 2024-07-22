const userRouter = require("express").Router();
const {
  registerUser,
 
} = require("../controllers/users");

userRouter;
userRouter.route("/user/registerUser").post(registerUser);
module.exports = userRouter;