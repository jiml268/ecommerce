const pool = require('../../config/db')

const getSingleProduct = async (req, res) => {
         
    try {
        const { productID } = req.body;
         const sql = "select  p.ProductID, p.ProductName,p.Description, brands.BrandName,pv.stock,pv.price,pv.sku,pvs.SpecValue,pv.colorID,s.SpecName,c.colorName,size.sizeName from products as p left JOIN productvariants as pv ON p.ProductID= pv.ProductID  left JOIN  productvariantspecs as pvs on pv.VariantID = pvs.VariantID left JOIN  color as c on pv.colorID = c.colorID left JOIN  specifications as s on pvs.SpecID = s.SpecID left JOIN  size  on pv.sizeID = size.sizeID left JOIN  brands  on p.BrandID = brands.BrandID where p.ProductID = ?; ";
        const product = await pool.query(sql, [productID])
        
 const sql1 = "SELECT p.ProductID, i.imageName,i.colorID From products as p left join images as i on p.ProductID = i.ProductID WHERE p.ProductID = ?;"
                const result1 = await pool.query(sql1, [productID])

    const sql2 = "select  c.colorName from products as p left JOIN productvariants as pv ON p.ProductID= pv.ProductID  left JOIN  color as c on pv.colorID = c.colorID  where p.ProductID = ? Group by c.colorName; ";
                const color = await pool.query(sql2, [productID])
       
     const sql3 = "select  s.sizeName from products as p left JOIN productvariants as pv ON p.ProductID= pv.ProductID  left JOIN  size as s on pv.sizeID = s.sizeID  where p.ProductID = ? Group by s.sizeName; ";
                const size = await pool.query(sql3, [productID])   
        
          return res.status(200).json({
                code: 200,
              product: product[0],
              sizes: size[0],
              colors: color[0],
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