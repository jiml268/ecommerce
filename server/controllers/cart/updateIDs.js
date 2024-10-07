const pool = require('../../config/db')

const updateIDs = async (req, res) => {
         
    try {
        const { id, cartID } = req.body
    

     const sql = "UPDATE cart SET id = ? WHERE cartNun = ?;";
     await pool.query(sql, [id, cartID])
 const sql1 = "UPDATE cart SET cartNun = ? WHERE id = ? and cartNun <> ?;";
     await pool.query(sql1, [cartID, id, cartID])
          return res.status(200).json({
                code: 200,
              message: "cart Ids updated"
                
            });          
    } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = updateIDs;