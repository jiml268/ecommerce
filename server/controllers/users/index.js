const registerUser = require("./registerUser");
const userVerification = require("./userVerification");
const resendVarify = require("./resendVarify");
const userLogin = require("./userLogin");
const deleteUser = require('./deleteUser')
const updatePassWord = require('./updatePassWord')
const resetPassword = require('./resetPassword')
const retreiveProfile = require('./retreiveProfile')
const updateProfile = require('./updateProfile')


module.exports = {
    registerUser,
    userVerification,
    resendVarify,
    userLogin,
    deleteUser,
    updatePassWord,
    resetPassword,
   retreiveProfile,
updateProfile
};