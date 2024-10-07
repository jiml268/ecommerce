const addToCart = require("./addToCart");
const quantityIncrease = require("./quantityIncrease");
const quantityDecrease = require("./quantityDecrease");
const deleteItem = require("./deleteItem");
const getCartByID = require("./getCartByID");
const getCartByCartID = require("./getCartByCartID");
const updateIDs = require("./updateIDs");




module.exports = {
    addToCart,
    quantityIncrease,
    quantityDecrease,
    deleteItem,
    getCartByID,
    getCartByCartID,
    updateIDs
};