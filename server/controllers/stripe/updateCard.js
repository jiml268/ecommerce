const pool = require('../../config/db')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const updateCard = async (req, res) => {
 const {userEmail, currectInfo } = req.body;
    try {
     const sql = "select stripe_acct from users where email = ?;"
        const ID = await pool.query(sql, [userEmail])
        const stripeID = ID[0][0].stripe_acct

        

      const customerSource = await stripe.paymentMethods.update(
      currectInfo.id,
  {
    card: {
      exp_month: currectInfo.exp_month,
      exp_year: currectInfo.exp_year,
    },
    billing_details: {
      name: currectInfo.name,
      address: {
        city: currectInfo.city,
        country: currectInfo.country,
        line1: currectInfo.line1,
        line2: currectInfo.line2,
        postal_code: currectInfo.postal_code,
        state: currectInfo.state
      }
    }
  }
    );
  
      
         return res.status(200).json({
          message: "card updated"
            });

        } catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }

}

module.exports = updateCard;