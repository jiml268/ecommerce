const pool = require('../../config/db')

const newProducts = async (req, res) => {
    const { type, categoryCode } = req.body
    
    let sql = null
    let sql1 = null
    let sqlParam = null
    switch(type) {
  case "New":
   let date = new Date();
    const day = date.getTime() - (20* 24 * 60 * 60 * 1000);

         date.setTime(day);
            sqlParam = date.toISOString();
            
            sql = "SELECT * FROM products  WHERE created_on >= ?;"
            sql1 = "SELECT p.ProductID, i.imageName,i.colorID From products as p left join images as i on p.ProductID = i.ProductID WHERE p.created_on >= ?;"
            break;
        case "Sale":
            sqlParam = 1 
          
           sql = "SELECT * FROM products  WHERE salesID >= ?;"
            sql1 = "SELECT p.ProductID, i.imageName,i.colorID From products as p left join images as i on p.ProductID = i.ProductID WHERE p.salesID >= ?;"  
             break;
        case "Department":
           sql = "SELECT p.*,cat.CategoryName  FROM products as p left JOIN  productcategories as pc on p.ProductID = pc.ProductID left JOIN  categories as cat on pc.CategoryID = cat.CategoryID WHERE pc.CategoryID = ?;"
            sql1 = "SELECT p.ProductID, i.imageName,i.colorID From products as p left join images as i on p.ProductID = i.ProductID left JOIN  productcategories as pc on p.ProductID = pc.ProductID WHERE pc.CategoryID = ?;"  
            sqlParam = categoryCode
             break;
default:
    break
}
         
    try {
       
       

        const result = await pool.query(sql, [sqlParam]) 
        const result1 = await pool.query(sql1, [sqlParam])



     
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