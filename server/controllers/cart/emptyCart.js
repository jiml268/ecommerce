const pool = require('../../config/db')

const emptyCart = async (req, res) => {
         
 try { const {cartID } = req.body
     const sql = "DELETE FROM cart WHERE cartNun = ?;";
     const catList = await pool.query(sql, [cartID])
          return res.status(200).json({
                code: 200,
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

module.exports = emptyCart;