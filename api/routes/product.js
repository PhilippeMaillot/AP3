const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer  = require('multer')
const path = require('path');
const fs = require('fs');
const uploadDir = path.join("./", 'uploads');
console.log('uploadDir:',uploadDir);
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

router.post("/add", productController.addProduct);

router.post("/delete/:id_product", productController.deleteProduct);

router.post("/upload", upload.array('file'), productController.uploadProductImage);

router.get('/images', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
      if (err) {
          console.error('Error reading upload directory:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      // Filtrer les fichiers pour ne garder que les images
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

      // Créer un tableau d'objets contenant le nom et le chemin de chaque image
      const images = imageFiles.map(file => {
          return {
              filename: file,
              path: `/uploads/${file}` // Assurez-vous d'utiliser le bon chemin vers les images
          };
      });
      console.log(images);

      // Envoyer les données JSON contenant les informations sur les images
      res.status(200).json(images);
  });
});


//router.post("/update", productController.updateProduct);

router.get("/getProductInfo/:id_product", productController.getProductInfo);

module.exports = router;