const pool = require('../../config/db')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getAllCards = async (req, res) => {
 const {userEmail, } = req.body;
    try {
     const sql = "select stripe_acct from users where email = ?;"
        const ID = await pool.query(sql, [userEmail])
        const stripeID = ID[0][0].stripe_acct
const allCards = await stripe.customers.listPaymentMethods(stripeID, {
         type: 'card',
       });
const customer = await stripe.customers.retrieve(stripeID);
    const defaultPaymentMethodId = customer.invoice_settings.default_payment_method;

         return res.status(200).json({
           allCards: allCards,
           defaultPaymentMethodId: defaultPaymentMethodId
            });

        } catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }

}

module.exports = getAllCards;