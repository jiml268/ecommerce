const pool = require('../../config/db')

const newProducts = async (req, res) => {

    let date = new Date();
    const day = date.getTime() - (60* 24 * 60 * 60 * 1000);

         date.setTime(day);
const isoString = date.toISOString();
         
    try {
    
        const sql ="SELECT * FROM products  WHERE created_on >= ?;"
        const result = await pool.query(sql, [isoString])
        const sql1 = "SELECT p.ProductID, i.imageName,i.colorID From products as p left join images as i on p.ProductID = i.ProductID WHERE p.created_on >= ?;"
                const result1 = await pool.query(sql1, [isoString])



     
          return res.status(200).json({
                code: 200,
               result: result[0],
                 result1: result1[0],
            });          
 } catch (err) {
    
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = newProducts;