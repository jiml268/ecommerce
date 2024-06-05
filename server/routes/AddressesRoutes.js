const AddressesRoutes = require("express").Router();
const {
  addAddress,
  editAddress,
  deleteAddress,
  getAllAddress
} = require("../controllers/addresses");

addressRouter;
addressRouter.route("/address/addAddress").post(addAddress);
addressRouter.route("/address/editAddress").post(editAddress);
addressRouter.route("/address/deleteAddress").post(deleteAddress);
addressRouter.route("/address/getAllAddress").post(getAllAddress);

module.exports = AddressesRoutes;