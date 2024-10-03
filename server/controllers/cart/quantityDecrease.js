const pool = require('../../config/db')

const quantityDecrease = async (req, res) => {
         
    try {
        const { sku, cartID } = req.body
        let message = ""
        const sql = "select * from cart where cartNun = ? and sku = ?";
        const result = await pool.query(sql, [cartID, sku])
        if (result[0][0].quantity > 1) {
            const sql1 = "UPDATE cart SET quantity = quantity - 1 WHERE cartNun = ? and sku = ?;";
            await pool.query(sql1, [cartID, sku])
            message = "quantity decrease"
        } else {
                       const sql1 = "delete from cart WHERE id = ?;";
            await pool.query(sql1, [result[0][0].id])
                        message = "item deleted"

        }
            
          return res.status(200).json({
              code: 200,
              result: result[0][0].quantity,
              message: message
                
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

module.exports = quantityDecrease;