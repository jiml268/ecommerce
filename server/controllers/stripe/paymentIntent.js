const pool = require('../../config/db')

const paymentIntent = async (req, res) => {

const message = []
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const {cartNun,customer } = req.body;
    let amount = 0
    try {
        const sql = "select cart.cartNun, cart.quantity,pv.Stock,pv.price,pv.sku,pv.colorID, pv.ProductID, p.ProductName, c.colorName, size.sizeName, sales.salepercent, ROUND(pv.price * sales.salepercent, 2)  as discount,IF(sales.salepercent IS NULL,(pv.price)*cart.quantity,((pv.price-ROUND(pv.price * sales.salepercent, 2))*cart.quantity))  as totalAmt  from cart left JOIN productvariants as pv on cart.sku = pv.sku  left JOIN products as p on pv.ProductID = p.ProductID left JOIN  color as c on pv.colorID = c.colorID left JOIN  size  on pv.sizeID = size.sizeID left JOIN sales on p.salesID = sales.salesID where cart.cartNun = ?;"
        const cart = await pool.query(sql, [cartNun])
        console.log('cart[0]', cart[0])
        if (cart[0].length > 0) {
            for (const item of cart[0]) {
                if (item.quantity <= item.Stock) {
                    amount += parseFloat(item.totalAmt);
                } else {
                    newAmount = Math.round((item.price - item.discount)*item.Stock*100)/100
                amount += newAmount
message.push({sku: item.sku, quantity: item.quantity, instock: item.Stock, itemName: item.ProductName})
                }
                console.log('amount 22', amount) 
            }
        }
         console.log('amount 23', amount)
        if (amount > 0 && amount < 35) {
            amount += 6.99
        }
        amount = amount.toFixed(2)
        console.log('amount 28', amount)
        try {
            console.log('amount 30', amount)
            if (customer) {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(+amount * 100),
                    currency: "USD",
                    customer: customer,
                    payment_method_types: ['card'],
                    metadata: { integration_check: 'accept_a_payment' },
                });
                 return res.status(200).json({
                 clientSecret: paymentIntent.client_secret,
                 message: message,
                 amount: amount
                
            });
            } else {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(+amount * 100),
                    currency: "USD",
                    payment_method_types: ['card'],
                    metadata: { integration_check: 'accept_a_payment' },
                });
                 return res.status(200).json({
                 clientSecret: paymentIntent.client_secret,
                 message: message,
                 amount: amount
                
            });
            }

            

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Payment failed' });
        }
    } catch (error) {
        console.log(error)
        console.error(error);
        res.status(500).send({ error: 'Payment failed' });
    }
}

module.exports = paymentIntent;