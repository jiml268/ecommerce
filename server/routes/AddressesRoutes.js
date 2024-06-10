const AddressesRoutes = require("express").Router();
const {
  addAddress,
  editAddress,
  deleteAddress,
  getAllAddress, 
  updateDefault
} = require("../controllers/addresses");

AddressesRoutes;
AddressesRoutes.route("/address/addAddress").post(addAddress);
AddressesRoutes.route("/address/editAddress").post(editAddress);
AddressesRoutes.route("/address/deleteAddress").post(deleteAddress);
AddressesRoutes.route("/address/getAllAddress").post(getAllAddress);
AddressesRoutes.route("/address/updateDefault").post(updateDefault);

module.exports = AddressesRoutes;