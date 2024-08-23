const pool = require('../../config/db')

const getCat_Subcat = async (req, res) => {
         
 try {
         const sql = "select * from categories; ";
     const catList = await pool.query(sql)
      const sql1 = "select * from subcategories; ";
     const subcatList = await pool.query(sql1)
     
          return res.status(200).json({
                code: 200,
              catList: catList[0],
                subcatList: subcatList[0]
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

module.exports = getCat_Subcat;