const registerUser = require("./registerUser");
const userVerification = require("./userVerification");
const resendVarify = require("./resendVarify");
const userLogin = require("./userLogin");
const deleteUser = require('./deleteUser')



module.exports = {
    registerUser,
    userVerification,
    resendVarify,
    userLogin,
   deleteUser
};