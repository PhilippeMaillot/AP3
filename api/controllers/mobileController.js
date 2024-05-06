const model = require("../models/mobileModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../middleware/jwtUtils");

class MobileController {
    static getAllUsers = async (req, res) => {
        try {
            model.getAllUsers((err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Erreur serveur" });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
    static addUser = async (req, res) => {
        console.log(req.body);
        try {
            const { user_f_name ,user_name, email, password, role, balance } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            
            await model.addUser(user_f_name, user_name, email, hashedPassword, role, balance);
            res.status(200).json({ message: "L'utilisateur a bien été ajouté !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
    static getUserInfo = async (req, res) => {
        try {
            const { id_user } = req.body;
            model.getUserInfo(id_user, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Erreur serveur" });
                }
                res.status(200).json(results);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
    static async login(req, res) {
        try {
            model.login(req.body.email, async (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Erreur serveur" });
                }
                if (results.length === 0) {
                    return res.status(404).json({ message: "Utilisateur non trouvé" });
                }
                const user = results[0];
                const passwordMatch = await bcrypt.compare(
                    req.body.password,
                    user.password_hash
                );
                if (passwordMatch) {
                    const token = generateToken(user);
                    res.status(200).json({ message: "User logged in", token });
                } else {
                    res.status(401).json({ message: "Mot de passe incorrect" });
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    static updateValue = async (req, res) => {
        try {
            const { id_user, user_f_name, user_name, email, password_hash, role, balance } = req.body;
            const updatedFields = [];
    
            if (user_f_name) {
                await model.updateFName(id_user, user_f_name);
                updatedFields.push("user_f_name");
            }
    
            // Ajoutez des conditions similaires pour les autres champs à mettre à jour
    
            res.status(200).json({ message: `La ou les donnée(s) suivante(s) a/ont été mise(s) à jour : ${updatedFields.join(', ')}` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
    static deleteUser = async (req, res) => {
        try {
            const { id_user } = req.body;
            await model.deleteUser(id_user);
            res.status(200).json({ message: "L'utilisateur a bien été supprimé !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

module.exports = MobileController;
