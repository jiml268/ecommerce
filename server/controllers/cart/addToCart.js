const pool = require('../../config/db')

const addToCart = async (req, res) => {
         
 try { const { sku, cartID, id } = req.body
     const sql = "insert into cart (cartNun, sku, quantity,id) value (?,?,1,?)";
     const catList = await pool.query(sql, [cartID, sku,id])
          return res.status(200).json({
                code: 200,
              message: "Item added"
                
            });          
 } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = addToCart;