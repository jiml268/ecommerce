const cartRouter = require("express").Router();
const {
   addToCart,
   quantityIncrease,
   quantityDecrease,
   deleteItem
 
} = require("../controllers/cart");

cartRouter;
cartRouter.route("/cart/addtocart").post(addToCart);
cartRouter.route("/cart/addquantity").post(quantityIncrease);
cartRouter.route("/cart/decreasequantity").post(quantityDecrease);
cartRouter.route("/cart/deleteItem").post(deleteItem);




module.exports = cartRouter;