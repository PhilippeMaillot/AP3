const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer  = require('multer')
const path = require('path');
const fs = require('fs');
const uploadDir = path.join("./", 'uploads');
const { verifyToken } = require("../middleware/jwtUtils");
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

router.get("/", productController.getAllProducts);

router.post("/add",verifyToken, productController.addProduct);

router.post("/delete/:id_product", verifyToken, productController.deleteProduct);

router.post("/upload", upload.array('file'), productController.uploadProductImage);

router.get('/images',verifyToken, (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
      if (err) {
          console.error('Error reading upload directory:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

      const images = imageFiles.map(file => {
          return {
              filename: file,
              path: `/uploads/${file}`
          };
      });
      res.status(200).json(images);
  });
});


//router.post("/update", productController.updateProduct);

router.get("/getProductInfo/:id_product", verifyToken, productController.getProductInfo);

module.exports = router;