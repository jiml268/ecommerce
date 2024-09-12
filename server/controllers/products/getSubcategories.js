const pool = require('../../config/db')

const getSubcategories = async (req, res) => {
         
    try {
     const {CategoryID} = req.body
         const sql = "SELECT * FROM `subcategories` where `CategoryID` = ?";
     const subcategories = await pool.query(sql, [CategoryID])
     
          return res.status(200).json({
                code: 200,
                subcategories: subcategories[0],
            });          
 } catch (err) {
    
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = getSubcategories;