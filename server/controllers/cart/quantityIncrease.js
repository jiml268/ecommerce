const pool = require('../../config/db')

const quantityIncrease = async (req, res) => {
         
 try { const { sku, cartID } = req.body
     const sql = "UPDATE cart SET quantity = quantity + 1 WHERE cartNun = ? and sku = ?;";
     await pool.query(sql, [cartID, sku])
          return res.status(200).json({
                code: 200,
              message: "quantity increase"
                
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

module.exports = quantityIncrease;