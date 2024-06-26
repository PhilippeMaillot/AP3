const db = require("../config/db");

class cartModel {
    static addCart = async (id_cart, id_product, item_quantity) => {
        const query = "INSERT INTO cart_items (id_cart, id_product, item_quantity) VALUES (?, ?, ?)";
        await db.query(query, [id_cart, id_product, item_quantity]);
    };

    static getCartItemIdByProductId = async (id_product, id_cart, cb) => {
        const query = "SELECT id_cart_item FROM cart_items WHERE id_product = ? AND id_cart = ?";
        db.query(query, [id_product, id_cart], (err, result) => {
            if (err) {
                cb(err, null);
            } else {
                if (result.length > 0) {
                    cb(null, result[0].id_cart_item);
                } else {
                    cb(null, null);
                }
            }
        });
    };

    static updateCartItemQuantity = async (id_cart_item, id_cart, operation, cb) => {
        let query;
        if (operation === "add") {
            query = "UPDATE cart_items SET item_quantity = item_quantity + 1 WHERE id_cart_item = ? AND id_cart = ?";
        } else if (operation === "remove") {
            query = "UPDATE cart_items SET item_quantity = item_quantity - 1 WHERE id_cart_item = ? AND id_cart = ?";
        } else {
            const error = new Error("Opération invalide");
            cb(error, null);
            return;
        }
        console.log("query : ", query)
        db.query(query, [id_cart_item, id_cart], cb);
    };

    static updateCartItemQuantity2 = async (id_cart_item, id_cart, operation, cb) => {
        let query;
        if (operation === "add") {
            query = "UPDATE cart_items SET item_quantity = item_quantity + 1 WHERE id_product = ? AND id_cart = ?";
        } else if (operation === "remove") {
            query = "UPDATE cart_items SET item_quantity = item_quantity - 1 WHERE id_product = ? AND id_cart = ?";
        } else {
            const error = new Error("Opération invalide");
            cb(error, null);
            return;
        }
        console.log("query : ", query)
        db.query(query, [id_cart_item, id_cart], cb);
    };


    static deleteCartItem = async (id_cart_item) => {
        const query = "DELETE FROM cart_items WHERE id_cart_item = ?";
        await db.query(query, [id_cart_item]);
    };

    static getCartInfo = async (id_user, cb) => {
        const query = `
            SELECT ci.id_cart_item, ci.id_product, ci.item_quantity, p.*
            FROM cart_items ci
            INNER JOIN cart c ON ci.id_cart = c.id_cart
            INNER JOIN product p ON ci.id_product = p.id_product
            WHERE c.id_user = ?
        `;
        db.query(query, [id_user], cb);
    };

    static getCart = async (id_user, cb) => {
        const query = "SELECT id_cart FROM cart WHERE id_user = ?";
        db.query(query, [id_user], cb);
    };

    static deleteAllItems = async (id_user) => {
        console.log("on passe dedans (suppression de tous les produits du panier)")
        const query = "DELETE FROM cart_items WHERE id_cart IN (SELECT id_cart FROM cart WHERE id_user = ?)";
        await db.query(query, [id_user]);
    };
}

module.exports = cartModel;
