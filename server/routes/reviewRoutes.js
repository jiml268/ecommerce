const reviewRouter = require("express").Router();
const {
   createReview,
 
} = require("../controllers/reviews");

reviewRouter;
reviewRouter.route("/reviews/createReview").post(createReview);



module.exports = reviewRouter;