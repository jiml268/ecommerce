const reviewRouter = require("express").Router();
const {
   createReview,
   getReviews,
 
} = require("../controllers/reviews");

reviewRouter;
reviewRouter.route("/reviews/createReview").post(createReview);
reviewRouter.route("/reviews/getReviews").post(getReviews);



module.exports = reviewRouter;