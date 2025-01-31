const pool = require('../../config/db')

const updateDefault = async (req, res) => {

const message = []
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const { email, cardid,  } = req.body;
    
 try {
const sql = "select stripe_acct from users where email = ?;"
     const ID = await pool.query(sql, [email])
     
     const stripeID = ID[0][0].stripe_acct
     await stripe.customers.update(stripeID, {
      invoice_settings: {
        default_payment_method: cardid,
      },
     });
      return res.status(200).json({

                 message: "default updated",
            
                
            });
     
     } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'update failed' });
    }
    }

module.exports = updateDefault;