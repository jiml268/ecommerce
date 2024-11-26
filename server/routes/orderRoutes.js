const ordersRouter = require("express").Router();
const {
    allOrders,
    orderDatails,
 
} = require("../controllers/orders");

ordersRouter;
ordersRouter.route("/orders/allOrders").post(allOrders);
ordersRouter.route("/orders/orderDatails").post(orderDatails);

module.exports = ordersRouter;