const registerUser = require("./registerUser");
const userVerification = require("./userVerification");
const resendVarify = require("./resendVarify");
const userLogin = require("./userLogin");
const deleteUser = require('./deleteUser')
const updatePassWord = require('./updatePassWord')



module.exports = {
    registerUser,
    userVerification,
    resendVarify,
    userLogin,
    deleteUser,
   updatePassWord
};