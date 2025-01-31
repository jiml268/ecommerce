const pool = require('../../config/db')

const saveForLater = async (req, res) => {
        
    try {
        const { sku, userID, quantity } = req.body


     const sql = "insert into saveitem (userID, sku, quantity) value (?,?,?);";
     await pool.query(sql, [userID, sku, quantity ])
          return res.status(200).json({
                code: 200,
              message: "Item saved"
                
            });          
    } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = saveForLater;