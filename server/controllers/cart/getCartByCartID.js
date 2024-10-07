const pool = require('../../config/db')

const getCartByCartID = async (req, res) => {
         
 try { const { cartNun } = req.body
     const sql = "SELECT * FROM cart WHERE cartNun = ?";
     const cart = await pool.query(sql, [id])
          return res.status(200).json({
                code: 200,
              message: "cart retrieved",
              cart: cart[0]
                
            });          
 } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = getCartByCartID;