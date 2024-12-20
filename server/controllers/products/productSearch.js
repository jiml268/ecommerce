const pool = require('../../config/db')

const productSearch = async (req, res) => {
         
    try {
     const {searchInfo} = req.body
const sql = `SELECT * FROM products WHERE MATCH (ProductName,Description) AGAINST (? IN BOOLEAN MODE)
UNION 
SELECT products.* FROM products inner join brands on products.BrandID = brands.BrandID WHERE lower(brands.BrandName) like lower(?)
UNION 
SELECT products.* FROM products inner join productcategories on products.ProductID = productcategories.ProductID inner join categories on productcategories.CategoryID = categories.CategoryID WHERE lower(categories.CategoryName) like lower(?)
UNION 
SELECT products.* FROM products inner join productcategories on products.ProductID = productcategories.ProductID inner join subcategories on productcategories.SubcategoryID = subcategories.SubcategoryID WHERE lower(subcategories.SubcategoryName) like lower(?)
UNION 
SELECT products.* FROM products inner join productvariants on products.ProductID = productvariants.ProductID inner join color on productvariants.colorID = color.colorID WHERE lower(color.colorName) like lower(?)
UNION 
SELECT products.* FROM products inner join productvariants on products.ProductID = productvariants.ProductID inner join size on productvariants.sizeID = size.sizeID WHERE lower(size.sizeName) like lower(?)
UNION 
SELECT products.* FROM products inner join productvariants on products.ProductID = productvariants.ProductID inner join productvariantspecs on productvariants.VariantID = productvariantspecs.VariantID WHERE lower(productvariantspecs.SpecValue) like lower(?)
UNION 
SELECT products.* FROM products inner join productvariants on products.ProductID = productvariants.ProductID inner join productvariantspecs on productvariants.VariantID = productvariantspecs.VariantID inner join specifications on productvariantspecs.SpecID = specifications.SpecID WHERE lower(specifications.SpecName) like lower(?)
UNION 
SELECT products.* FROM products inner join productvariants on products.ProductID = productvariants.ProductID WHERE lower(productvariants.sku) like lower("?")


;`
        const result = await pool.query(sql, [searchInfo, searchInfo, searchInfo, searchInfo, searchInfo, searchInfo, searchInfo, searchInfo, searchInfo])
     
          return res.status(200).json({
                code: 200,
                result: result[0],
            });          
 } catch (err) {
    
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = productSearch;