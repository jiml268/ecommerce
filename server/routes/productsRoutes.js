const productRouter = require("express").Router();
const {
    getCategories,
    getSubcategories,
    productsByCat_Subcat
 
} = require("../controllers/products");

productRouter;
productRouter.route("/products/getCategories").get(getCategories);
productRouter.route("/products/getSubcategories").post(getSubcategories);
productRouter.route("/products/getAllProds").post(productsByCat_Subcat);


module.exports = productRouter;