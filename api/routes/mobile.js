const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/jwtUtils");
const mobileController = require("../controllers/mobileController");

router.get("/", mobileController.getAllUsers);

router.post("/add",verifyToken, mobileController.addUser);

router.post("/delete",verifyToken, mobileController.deleteUser);

router.post("/update",verifyToken, mobileController.updateValue);

router.get("/getUserInfo",verifyToken, mobileController.getUserInfo);

router.post("/login", mobileController.login);

module.exports = router;