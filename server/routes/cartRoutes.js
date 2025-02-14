const cartRouter = require("express").Router();
const {
   addToCart,
   quantityIncrease,
   quantityDecrease,
   deleteItem,
   getCartByID,
   getCartByCartID,
   updateIDs,
   emptyCart,
   getCart,
   saveForLater,
   addToOrders,
   showSaved
 
} = require("../controllers/cart");

cartRouter;
cartRouter.route("/cart/addtocart").post(addToCart);
cartRouter.route("/cart/addquantity").post(quantityIncrease);
cartRouter.route("/cart/decreasequantity").post(quantityDecrease);
cartRouter.route("/cart/deleteItem").post(deleteItem);
cartRouter.route("/cart/getCartByID").post(getCartByID);
cartRouter.route("/cart/getCartByCartID").post(getCartByCartID);
cartRouter.route("/cart/updateIDs").post(updateIDs);
cartRouter.route("/cart/emptyCart").post(emptyCart);
cartRouter.route("/cart/getCart").post(getCart);
cartRouter.route("/cart/saveForLater").post(saveForLater);
cartRouter.route("/cart/addToOrders").post(addToOrders);
cartRouter.route("/cart/showSaved").post(showSaved);



module.exports = cartRouter;