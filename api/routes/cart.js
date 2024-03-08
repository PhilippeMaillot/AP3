const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getAllCarts);

router.post("/add", cartController.addCart);

router.post("/update", cartController.updateCartItemQuantity);

router.post("/delete/:id_cart_item", cartController.deleteCart);

router.get("/getCartInfo/:id_user", cartController.getCartInfo);

module.exports = router;