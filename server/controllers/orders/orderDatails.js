const pool = require('../../config/db')

const orderDatails = async (req, res) => {
     const { orderId, } = req.body     
 try {
         const sql = "select * from orders where orderId = ?; ";
     const orderInfo = await pool.query(sql, [orderId]);
         const sql1 = "select * from orderitems where orderId = ?; ";
     const orderDetails = await pool.query(sql1, [orderId]);

const sql2 = "select orderitems.sku,images.imageName from orderitems left join productvariants as pv on orderitems.sku = pv.sku left join images on pv.ProductID = images.ProductID where orderitems.orderId = ?; " 
     const images = await pool.query(sql2, [orderId]);
let stripeInfo = null
     if (orderInfo.length > 0) {
         const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
         
         const stripeID = orderInfo[0][0].stripe_id
         stripeInfo = await stripe.paymentIntents.retrieve(
  stripeID
         );
         
        

}


          return res.status(200).json({
            code: 200,
            orderInfo: orderInfo[0],
            orderDetails: orderDetails[0],
              images: images[0],
            stripeInfo: stripeInfo
 
          }); 
     
     
 } catch (err) {
    
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = orderDatails;