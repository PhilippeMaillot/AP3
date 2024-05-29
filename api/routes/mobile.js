const express = require("express");
const router = express.Router();
const mobileController = require("../controllers/mobileController");
const path = require('path');
const multer  = require('multer')
const fs = require('fs');
const uploadDir = path.join("./", 'uploads');
multer({ dest: './uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage })

router.get("/", mobileController.getAllUsers);
router.post("/add", mobileController.addUser);
router.post("/delete", mobileController.deleteUser);
router.post("/update", mobileController.updateValue);
router.get("/getUserInfo/:id_user", mobileController.getUserInfo);
router.post("/updateBalance", mobileController.updateUserBalance);


// Ajoutez la route de connexion (login) ici
router.post("/login", mobileController.login);

router.post("/upload", upload.array('file'));

module.exports = router;
