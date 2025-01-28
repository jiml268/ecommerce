const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const removeCard = async (req, res) => {
 const {currectInfo } = req.body;
    try {
    
      const customerSource = await stripe.paymentMethods.detach( currectInfo.id);
         return res.status(200).json({
          message: "card deleted"
            });

        } catch (error) {
        console.error(error);
        res.status(500).send({ error: error });
    }

}

module.exports = removeCard;