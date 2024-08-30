const productRouter = require("express").Router();
const {
    getCategories,
    getSubcategories,
    productsByCat_Subcat,
    getSingleProduct,
    getCat_Subcat,
     newProducts
 
} = require("../controllers/products");

productRouter;
productRouter.route("/products/getCategories").get(getCategories);
productRouter.route("/products/getSubcategories").post(getSubcategories);
productRouter.route("/products/getAllProds").post(productsByCat_Subcat);
productRouter.route("/products/getSingleProduct").post(getSingleProduct);
productRouter.route("/products/catmenu").get(getCat_Subcat);
productRouter.route("/products/newProducts").get(newProducts);


module.exports = productRouter;