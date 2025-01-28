const paymentIntent = require("./paymentIntent");
const getStripeID = require("./getStripeID");
const createStripeAcct = require("./createStripeAcct");
const getAllCards = require("./getAllCards");
const updateDefault = require("./updateDefault");
const updateCard = require("./updateCard");
const removeCard = require("./removeCard");


module.exports = {
    paymentIntent,
    getStripeID,
    createStripeAcct,
    getAllCards,
    updateDefault,
    updateCard,
removeCard
};