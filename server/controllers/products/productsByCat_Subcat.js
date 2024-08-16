const pool = require('../../config/db')

const productsByCat_Subcat = async (req, res) => {
         
    try {
     const {CategoryID, SubcategoryID} = req.body
        const sql ="select p.ProductName,p.Price,p.Description, b.BrandName from productcategories AS pc INNER JOIN products as p ON pc.ProductID= p.ProductID INNER JOIN brands as b ON p.BrandID=  b.BrandID where pc.CategoryID = ? and pc.SubcategoryID = ?;"
     const result = await pool.query(sql, [CategoryID,SubcategoryID ])
     
          return res.status(200).json({
                code: 200,
                result: result[0],
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

module.exports = productsByCat_Subcat;