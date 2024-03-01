const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);

router.post("/add", productController.addProduct);

router.post("/delete/:id_product", productController.deleteProduct);

//router.post("/update", productController.updateProduct);

router.get("/getProductInfo/:id_product", productController.getProductInfo);

module.exports = router;