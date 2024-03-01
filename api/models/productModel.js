const db = require("../config/db");

class productModel {
    static getAllProducts = async (cb) => {
        const query = "SELECT * FROM product";
        db.query(query, cb);
    };

    static addProduct = async (product_title, product_description, product_price, product_img, stock) => {
        const query = "INSERT INTO product (product_title, product_description, product_price, product_img, stock) VALUES (?, ?, ?, ?, ?)";
        await db.query(query, [product_title, product_description, product_price, product_img, stock]);
    };

    static deleteProduct = async (id_product) => {
        const query = "DELETE FROM product WHERE id_product = ?";
        await db.query(query, [id_product]);
    };

    static updateProduct = async (id_product, product_title, product_description, product_price, product_img, stock) => {
        const query = "UPDATE product SET product_title = ?, product_description = ?, product_price = ?, product_img = ? WHERE id_product = ?, stock = ?";
        await db.query(query, [id_product, product_title, product_description, product_price, product_size, product_img, stock]);
    };

    static getProductInfo = async (id_product, cb) => {
        const query = "SELECT * FROM product WHERE id_product = ?";
        db.query(query, [id_product], cb);
    };
}

module.exports = productModel;
