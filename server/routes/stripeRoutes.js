const stripeRouter = require("express").Router();

const {
  paymentIntent,
 
 
} = require("../controllers/stripe");

stripeRouter;
stripeRouter.route("/stripe/paymentIntent").post(paymentIntent);

module.exports = stripeRouter;