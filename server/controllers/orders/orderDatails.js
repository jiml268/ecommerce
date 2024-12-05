const pool = require('../../config/db')

const orderDatails = async (req, res) => {
  
     const { orderId, } = req.body     
 try {
         const sql = "select * from orders where orderId = ?; ";
     const orderInfo = await pool.query(sql, [orderId]);
 

   
   
      const sql2 = "SELECT t1.orderId, t1.ordernum,t2.ProductName, t2.sku,t2.quantity,t2.origian_price,t2.sales_price, t4.imageName  FROM orders t1 JOIN orderitems t2 ON t1.orderId = t2.orderId JOIN productvariants t3 ON t2.sku = t3.sku LEFT JOIN (SELECT images.imageID, images.imageName, images.colorID, images.ProductID FROM images INNER JOIN ( SELECT MIN(imageID) as minImageID, ProductID, colorID FROM images GROUP BY ProductID, colorID ) imageGroup ON images.imageID = imageGroup.minImageID) t4 ON t3.ProductID = t4.ProductID and (t3.colorID = t4.colorID or t3.colorID is null) WHERE t2.orderId = ?;"
       const orderDetails = await pool.query(sql2, [orderId]);
let stripeInfo = null
   if (orderInfo.length > 0) {
       console.log(process.env.STRIPE_SECRET_KEY)
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