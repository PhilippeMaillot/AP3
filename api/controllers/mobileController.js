const model = require("../models/mobileModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../middleware/jwtUtils");

class MobileController {
    static getAllUsers = async (req, res) => {
        try {
          model.getAllUsers((err, results) => {
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
    
    static addUser = async (req, res) => {
        console.log(req.body);
        try {
            const { user_f_name ,user_name, email, password_hash, role, balance } = req.body;
            const hashedPassword = await bcrypt.hash(password_hash, 10);
            
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
    
    static async login(req, res) {
        try {
            console.log(req.body);
          model.login(req.body.email, async (err, results) => {
            if (err) {
              res.status(500).json({ err: "Erreur serveur" });
            } else {
              if (results.length === 0) {
                res.status(404).json({ message: "Utilisateur non trouvé" });
              } else {
                const user = results[0];
                console.log(user);
                const passwordMatch = await bcrypt.compare(
                  req.body.password_hash,
                  user.password_hash
                );
                if (passwordMatch) {
                  const token = generateToken(user);
                  console.log("c carré");
                  res.status(200);
                  res.json({ message: "User logged in", token });
                } else {
                  res.status(401).json({ message: "Mot de passe incorrect" });
                }
              }
            }
          });
        } catch (err) {
          res.status(500).json({ err: "Erreur serveur" });
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
    
            if (user_name) {
                await model.updateUserName(id_user, user_name);
                updatedFields.push("user_name");
            }
    
            if (email) {
                await model.updateEmail(id_user, email);
                updatedFields.push("email");
            }
    
            if (password_hash) {
                await model.updatePassword(id_user, password_hash);
                updatedFields.push("password");
            }
    
            if (role) {
                await model.updateRole(id_user, role);
                updatedFields.push("role");
            }
    
            if (balance) {
                await model.updateBalance(id_user, balance);
                updatedFields.push("balance");
            }

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
