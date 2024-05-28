const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addCart);

router.post("/update", cartController.updateCartItemQuantity);

router.post("/delete/:id_cart_item", cartController.deleteCart);

router.post("/deleteAll/:id_user", cartController.deleteAllItems);

router.get("/getCartInfo/:id_user", cartController.getCartInfo);

router.get("/get/:id_user", cartController.getCart);

module.exports = router;