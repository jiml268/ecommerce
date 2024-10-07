const cartRouter = require("express").Router();
const {
   addToCart,
   quantityIncrease,
   quantityDecrease,
   deleteItem,
   getCartByID,
   getCartByCartID,
   updateIDs
 
} = require("../controllers/cart");

cartRouter;
cartRouter.route("/cart/addtocart").post(addToCart);
cartRouter.route("/cart/addquantity").post(quantityIncrease);
cartRouter.route("/cart/decreasequantity").post(quantityDecrease);
cartRouter.route("/cart/deleteItem").post(deleteItem);
cartRouter.route("/cart/getCartByID").post(getCartByID);
cartRouter.route("/cart/getCartByCartID").post(getCartByCartID);
cartRouter.route("/cart/updateIDs").post(updateIDs);




module.exports = cartRouter;