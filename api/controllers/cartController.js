const model = require("../models/cartModel");

class CartController {
    static addCart = async (req, res) => {
        console.log("voici le body : ",req.body);
        try {
            const { id_product , id_cart } = req.body;
            console.log("voici l'id du produit : ",id_product);
            model.getCartItemIdByProductId(id_product, id_cart, async (err, id_cart_item) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal Server Error" });
                } else {
                    if (id_cart_item) {
                        console.log("on passe dedans")
                        console.log(id_cart_item)
                        try {
                            const operation = "add"
                            await model.updateCartItemQuantity(id_cart_item, id_cart, operation);
                            res.status(200).json({ message: "La quantité de l'article a été mise à jour dans le panier !" });
                        } catch (error) {
                            console.error(error);
                            res.status(500).json({ error: "Internal Server Error" });
                        }
                    } else {
                        const { id_cart, item_quantity } = req.body;
                        await model.addCart(id_cart, id_product, item_quantity);
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
        const { id_cart_item, id_cart, operation} = req.body;
        console.log("voici le body lol: ",req.body);
        try {
            await model.updateCartItemQuantity2(id_cart_item, id_cart ,operation);
            res.status(200).json({ message: "La quantité de l'article a été mise à jour dans le panier !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static deleteCart = async (req, res) => {
        console.log("on passe dedans (suppression du produit du panier)")
        try {
            const { id_cart_item } = req.params;
            console.log("voici l'id du panier : ",id_cart_item)
            await model.deleteCartItem(id_cart_item);
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

    static getCart = async (req, res) => {
        console.log("on passe dedans")
        console.log(req.params)
        try {
            const { id_user } = req.params;
            console.log(id_user)
            model.getCart(id_user, (err, results) => {
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

    static deleteAllItems = async (req, res) => {
        try {
            const { id_user } = req.params;
            await model.deleteAllItems(id_user);
            res.status(200).json({ message: "Tous les produits ont bien été supprimés du panier !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

module.exports = CartController;