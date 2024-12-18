const reviewRouter = require("express").Router();
const {
   createReview,
   getReviewsStats,
 
} = require("../controllers/reviews");

reviewRouter;
reviewRouter.route("/reviews/createReview").post(createReview);
reviewRouter.route("/reviews/getReviewsStats").post(getReviewsStats);



module.exports = reviewRouter;