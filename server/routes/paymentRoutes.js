const paymentRoutes = require("express").Router();
const {
  createPayment,
  editPayment,
  deletePayment,
  listPayments,
  
} = require("../controllers/payments");

paymentRoutes;
paymentRoutes.route("/payment/createPayment").post(createPayment);
paymentRoutes.route("/payment/editPayment").post(editPayment);
paymentRoutes.route("/payment/deletePayment").post(deletePayment);
paymentRoutes.route("/payment/listPayments").post(listPayments);


module.exports = paymentRoutes;