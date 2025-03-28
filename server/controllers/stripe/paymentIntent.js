const pool = require("../../config/db");

const paymentIntent = async (req, res) => {
  const message = [];
  const cart = [];
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const { cartNun, customer, saveCard } = req.body;
  let amount = 0;
  try {
    const sql =
      "select cart.cartNun, cart.quantity,pv.Stock,pv.price,pv.sku,pv.colorID, pv.ProductID, p.ProductName, c.colorName, size.sizeName, sales.salepercent, ROUND(pv.price * sales.salepercent, 2)  as discount,IF(sales.salepercent IS NULL,(pv.price)*cart.quantity,((pv.price-ROUND(pv.price * sales.salepercent, 2))*cart.quantity))  as totalAmt  from cart left JOIN productvariants as pv on cart.sku = pv.sku  left JOIN products as p on pv.ProductID = p.ProductID left JOIN  color as c on pv.colorID = c.colorID left JOIN  size  on pv.sizeID = size.sizeID left JOIN sales on p.salesID = sales.salesID where cart.cartNun = ?;";
    const cart = await pool.query(sql, [cartNun]);

    if (cart[0].length > 0) {
      for (const item of cart[0]) {
        if (item.quantity <= item.Stock) {
          amount += parseFloat(item.totalAmt);
          cart.push({
            cartNun: item.cartNun,
            sku: item.sku,
            quantity: item.quantity,
            itemName: item.ProductName,
            price: item.price,
            discount: item.discount,
            color: item.colorName,
            size: item.sizeName,
            totalAmt: item.totalAmt,
          });
        } else {
          newAmount =
            Math.round((item.price - item.discount) * item.Stock * 100) / 100;
          amount += newAmount;
          message.push({
            sku: item.sku,
            quantity: item.quantity,
            instock: item.Stock,
            itemName: item.ProductName,
          });
          cart.push({
            cartNun: item.cartNun,
            sku: item.sku,
            quantity: item.Stock,
            itemName: item.ProductName,
            price: item.price,
            discount: item.discount,
            color: item.colorName,
            size: item.sizeName,
            totalAmt: item.totalAmt,
          });
        }
      }
    }
    if (amount > 0 && amount < 35) {
      amount += 6.99;
    }
    amount = amount.toFixed(2);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(+amount * 100),
        currency: "USD",
        customer: customer ? customer : undefined,
        setup_future_usage: saveCard ? "off_session" : undefined,
        payment_method_types: ["card"],
        metadata: { integration_check: "accept_a_payment" },
      });
      return res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        message: message,
        amount: amount,
        cart: cart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Payment failed" });
  }
};

module.exports = paymentIntent;
