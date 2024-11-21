const stripeRouter = require("express").Router();

const {
  paymentIntent,
  getStripeID,
    createStripeAcct
 
} = require("../controllers/stripe");

stripeRouter;
stripeRouter.route("/stripe/paymentIntent").post(paymentIntent);
stripeRouter.route("/stripe/getStripeID").post(getStripeID);
stripeRouter.route("/stripe/createStripeAcct").post(createStripeAcct);


module.exports = stripeRouter;