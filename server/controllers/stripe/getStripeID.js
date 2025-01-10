const pool = require('../../config/db')

const getStripeID = async (req, res) => {
 const {userEmail, } = req.body;
    try {
     const sql = "select stripe_acct from users where email = ?;"
        const ID = await pool.query(sql, [userEmail])
        console.log(ID[0][0].stripe_acct)
         return res.status(200).json({
                 stripeID: ID[0][0].stripe_acct,
            });

        } catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }

}

module.exports = getStripeID;