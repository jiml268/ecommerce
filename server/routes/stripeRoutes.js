const stripeRouter = require("express").Router();

const {
  paymentIntent,
  getStripeID,
  createStripeAcct,
  getAllCards,
  updateDefault,
    updateCard
 
} = require("../controllers/stripe");

stripeRouter;
stripeRouter.route("/stripe/paymentIntent").post(paymentIntent);
stripeRouter.route("/stripe/getStripeID").post(getStripeID);
stripeRouter.route("/stripe/createStripeAcct").post(createStripeAcct);
stripeRouter.route("/stripe/getAllCards").post(getAllCards);
stripeRouter.route("/stripe/updateDefault").post(updateDefault);
stripeRouter.route("/stripe/updateCard").post(updateCard);


module.exports = stripeRouter;