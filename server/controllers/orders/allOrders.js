const pool = require('../../config/db')

const allOrders = async (req, res) => {
    
const { id, } = req.body 
 try {
         const sql = "SELECT t1.*, SUM(t2.sales_price) AS total_sum FROM orders t1 LEFT JOIN orderitems t2 ON t1.orderId = t2.orderId where t1.id = ? GROUP BY t1.orderId   ; ";
     const ordersList = await pool.query(sql, [id]);


     const sql1 = "SELECT t1.orderId, t1.ordernum,t2.sku,t4.imageName FROM orders t1 JOIN orderitems t2 ON t1.orderId = t2.orderId JOIN productvariants t3 ON t2.sku = t3.sku LEFT JOIN (SELECT images.imageID, images.imageName, images.colorID, images.ProductID FROM images INNER JOIN ( SELECT MIN(imageID) as minImageID, ProductID, colorID FROM images GROUP BY ProductID, colorID ) imageGroup ON images.imageID = imageGroup.minImageID) t4 ON t3.ProductID = t4.ProductID and (t3.colorID = t4.colorID or t3.colorID is null) WHERE id = ?;"
     const orderImages =  await pool.query(sql1, [id]);
          return res.status(200).json({
                code: 200,
              ordersList: ordersList[0],
               orderImages: orderImages[0] 
            });          
 } catch (err) {
    console.log(err)
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = allOrders;