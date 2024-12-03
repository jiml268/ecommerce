const pool = require('../../config/db')

const addToOrders = async (req, res) => {
         let orderID = 0
 try { const { cartID, custID, stripeID } = req.body
     const sql = "insert into orders (ordernum, id, stripe_id) value (?,?,?)";
     const newOrder = await pool.query(sql, [cartID,custID, stripeID])
     orderID = newOrder[0].insertId    

     try {
        const sql = "select  cart.cartNun, cart.quantity,pv.Stock,pv.price,pv.sku,pv.colorID, pv.ProductID, p.ProductName, c.colorName, size.sizeName, sales.salepercent, ROUND(pv.price * sales.salepercent, 2)  as discount,IF(sales.salepercent IS NULL,(pv.price)*cart.quantity,((pv.price-ROUND(pv.price * sales.salepercent, 2))*cart.quantity))  as totalAmt  from cart left JOIN productvariants as pv on cart.sku = pv.sku  left JOIN products as p on pv.ProductID = p.ProductID left JOIN  color as c on pv.colorID = c.colorID left JOIN  size  on pv.sizeID = size.sizeID left JOIN sales on p.salesID = sales.salesID where cart.cartNun = ?;"
         const cart = await pool.query(sql, [cartID])
          if (cart[0].length > 0) {
            for (const item of cart[0]) {
                const sql1 = "insert into orderItems (orderId,ProductName,sku,quantity,origian_price, sales_price) value (?,?,?,?,?,?)"
                await pool.query(sql1, [orderID,item.ProductName,item.sku,item.quantity,item.price*item.quantity,item.totalAmt])
            }
        }
     } catch (err) {
            
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
     } 
     try {
         const sql2 = "delete from cart where cartNun = ?";
     await pool.query(sql2, [cartID])
     } catch (err) {
          
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
     } 

          return res.status(200).json({
                code: 200,
            });          
 } catch (err) {
    
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = addToOrders;