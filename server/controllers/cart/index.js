const addToCart = require("./addToCart");
const quantityIncrease = require("./quantityIncrease");
const quantityDecrease = require("./quantityDecrease");
const deleteItem = require("./deleteItem");
const getCartByID = require("./getCartByID");
const getCartByCartID = require("./getCartByCartID");
const updateIDs = require("./updateIDs");
const emptyCart = require("./emptyCart");
const getCart = require("./getCart");
const saveForLater = require("./saveForLater");
const addToOrders = require("./addToOrders");



module.exports = {
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
    addToOrders
};