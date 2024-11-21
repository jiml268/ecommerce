const pool = require('../../config/db')

const createStripeAcct = async (req, res) => {
     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 const {userEmail, } = req.body;
    try {
    const customer = await stripe.customers.create({
  email:userEmail,
    });
     
      const sql = "update users set stripe_acct = ? where email = ?;"
        const ID = await pool.query(sql, [customer.id,userEmail]) 
      
      
       return res.status(200).json({
                 ID: customer.id,
            });
        } catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }

}

module.exports = createStripeAcct;