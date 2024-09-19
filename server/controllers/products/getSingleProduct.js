const pool = require('../../config/db')

const getSingleProduct = async (req, res) => {
         
    try {
        const { productID } = req.body;
         const sql = "select * from products as p left JOIN productvariants as pv ON p.ProductID= pv.ProductID  left JOIN  productvariantspecs as pvs on pv.VariantID = pvs.VariantID left JOIN  color as c on pv.colorID = c.colorID left JOIN  specifications as s on pvs.SpecID = s.SpecID where p.ProductID = ?; ";
        const product = await pool.query(sql, [productID])
        
 const sql1 = "SELECT p.ProductID, i.imageName,i.colorID From products as p left join images as i on p.ProductID = i.ProductID WHERE p.ProductID = ?;"
                const result1 = await pool.query(sql1, [productID])

     
          return res.status(200).json({
                code: 200,
              product: product[0],
                image: result1[0]
            });          
 } catch (err) {
    
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = getSingleProduct;