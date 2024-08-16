const pool = require('../../config/db')

const getCategories = async (req, res) => {
         
 try {
         const sql = "SELECT * FROM categories ";
     const categories = await pool.query(sql)
     
          return res.status(200).json({
                code: 200,
                categories: categories[0],
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

module.exports = getCategories;