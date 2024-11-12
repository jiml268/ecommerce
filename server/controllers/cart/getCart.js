const pool = require('../../config/db')

const getCart = async (req, res) => {
         
    try {
        const { cartID } = req.body
         

     const sql = "select cart.cartNun, cart.quantity,pv.Stock,pv.price,pv.sku,pv.colorID, pv.ProductID, p.ProductName, c.colorName, size.sizeName, sales.salepercent, ROUND(pv.price * sales.salepercent, 2) as discount  from cart left JOIN productvariants as pv on cart.sku = pv.sku  left JOIN products as p on pv.ProductID = p.ProductID left JOIN  color as c on pv.colorID = c.colorID left JOIN  size  on pv.sizeID = size.sizeID left JOIN sales on p.salesID = sales.salesID where cart.cartNun = ?;"
     const cart = await pool.query(sql, [cartID])

     const sql1 = "select images.imageName,images.ProductID, images.colorID from cart left outer join productvariants as pv on cart.sku = pv.sku INNER JOIN images ON pv.ProductID = images.ProductID AND (pv.colorID = images.colorID OR(pv.colorID IS NULL AND images.colorID IS NULL))  where cart.cartNun = ?; "
     const images = await pool.query(sql1, [cartID])


          return res.status(200).json({
              code: 200,
              cart: cart[0],
              images: images[0],
              message: "cart clear"
                
            });          
 } catch (err) {
     
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = getCart;