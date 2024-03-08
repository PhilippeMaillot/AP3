const model = require("../models/cartModel");

class CartController {
    static addCart = async (req, res) => {
        console.log(req.body);
        try {
            const { id_product } = req.body;
            model.getCartItemIdByProductId(id_product, async (err, id_cart_item) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                } else {
                    if (id_cart_item) {
                        try {
                            const operation = "add"
                            await model.updateCartItemQuantity(id_cart_item, operation);
                            res.status(200).json({ message: "La quantité de l'article a été mise à jour dans le panier !" });
                        } catch (error) {
                            console.error(error);
                            res.status(500).json({ error: "Internal Server Error" });
                        }
                    } else {
                        const { id_cart_item, item_quantity } = req.body;
                        await model.addCart(id_cart_item, id_product, item_quantity);
                        res.status(200).json({ message: "Le produit a bien été ajouté dans le panier !" });
                    }
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static updateCartItemQuantity = async (req, res) => {
        const { id_cart_item } = req.params;
        const { operation } = req.body
        try {
            await model.updateCartItemQuantity(id_cart_item, operation);
            res.status(200).json({ message: "La quantité de l'article a été mise à jour dans le panier !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static deleteCart = async (req, res) => {
        try {
            const { id_cart } = req.params;
            await model.deleteCart(id_cart);
            res.status(200).json({ message: "Le produit a bien été supprimé du panier !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static getCartInfo = async (req, res) => {
        try {
            const { id_user } = req.params;
            model.getCartInfo(id_user, (err, results) => {
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

module.exports = CartController;