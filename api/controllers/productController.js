const model = require("../models/productModel");

class ProductController {
  static getAllProducts = async (req, res) => {
    try {
      model.getAllProducts((err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Erreur serveur" });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static addProduct = async (req, res) => {
    console.log(req.body);
    try {
      const { product_title, product_description, product_price, product_img, stock } = req.body;
      await model.addProduct(product_title, product_description, product_price, product_img, stock);
      res.status(200).json({ message: "Le produit a bien été ajouté !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      const { id_product } = req.params;
      await model.deleteProduct(id_product);
      res.status(200).json({ message: "Le produit a bien été supprimé !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static updateValue = async (req, res) => {
    try {
        const { id_product, product_title, product_description, product_price, product_img } = req.body;

        const updatedFields = [];

        if (user_f_name) {
            await model.updateTitle(id_product, product_title);
            updatedFields.push("product_title");
        }

        if (user_name) {
            await model.updateDescription(id_product, product_description);
            updatedFields.push("product_description");
        }

        if (email) {
            await model.updatePrice(id_product, product_price);
            updatedFields.push("product_price");
        }

        if (password_hash) {
            await model.updateImg(id_product, product_img);
            updatedFields.push("product_img");
        }
        res.status(200).json({ message: `La ou les donnée(s) suivante(s) a/ont été mise(s) à jour : ${updatedFields.join(', ')}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

  static getProductInfo = async (req, res) => {
    try {
      const { id_product } = req.params;
      model.getProductInfo(id_product, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Erreur serveur" });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = ProductController;
