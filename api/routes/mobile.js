const express = require("express");
const router = express.Router();
const mobileController = require("../controllers/mobileController");

router.get("/", mobileController.getAllUsers);

router.post("/add", mobileController.addUser);

router.post("/delete", mobileController.deleteUser);

router.post("/update", mobileController.updateValue);

router.get("/getUserInfo", mobileController.getUserInfo);

router.post("/login", mobileController.login);

module.exports = router;