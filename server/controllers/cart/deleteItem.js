const pool = require('../../config/db')

const deleteItem = async (req, res) => {
         
    try {
        const { sku, cartID } = req.body
        console.log('deleteItem',req.body ) 
        let message = ""
                       const sql1 = "delete from cart WHERE cartNun = ? and sku = ?;";
            await pool.query(sql1, [cartID, sku])
                        message = "item deleted"      
          return res.status(200).json({
              code: 200,
              message: message
                
            });          
    } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = deleteItem;