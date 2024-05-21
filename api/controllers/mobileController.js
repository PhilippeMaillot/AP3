const model = require("../models/mobileModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../middleware/jwtUtils");

class MobileController {
    static getAllUsers = async (req, res) => {
        try {
            console.log("Fetching all users...");
            model.getAllUsers((err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Erreur serveur" });
                } else {
                    console.log("All users fetched successfully.");
                    console.log(results)
                    res.status(200).json(results);
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static addUser = async (req, res) => {
        console.log("Adding a new user...");
        console.log(req.body);
        try {
            const { user_f_name, user_name, email, password_hash, role, balance } = req.body;
            const hashedPassword = await bcrypt.hash(password_hash, 10);

            await model.addUser(user_f_name, user_name, email, hashedPassword, role, balance);
            console.log("New user added successfully.");
            res.status(200).json({ message: "L'utilisateur a bien été ajouté !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static getUserInfo = async (req, res) => {
        console.log("Fetching user information...");
        try {
            const { id_user } = req.params;
            console.log(id_user)

            model.getUserInfo(id_user, (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Erreur serveur" });
                } else {
                    console.log("User information fetched successfully.");
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
     const { email, password } = req.body;

model.login(email, async (err, results) => {
  if (err) {
    res.status(500).json({ err: "Erreur serveur" });
  } else {
    if (results.length === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      const user = results[0];
      
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      
      if (passwordMatch) {
        const token = generateToken(user);
        console.log("Connexion réussie");
        res.status(200).json({ message: "User logged in", token });
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
        console.log("Updating user information...");
        try {
            const { id_user, user_f_name, user_name, email, password_hash, role, balance, img } = req.body;

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
            if (img) {
                await model.userImg(id_user, img);
                updatedFields.push("img");
            }

            console.log("User information updated successfully.");
            res.status(200).json({ message: `La ou les donnée(s) suivante(s) a/ont été mise(s) à jour : ${updatedFields.join(', ')}` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static deleteUser = async (req, res) => {
        console.log("Deleting user...");
        try {
            const { id_user } = req.body;
            await model.deleteUser(id_user);
            console.log("User deleted successfully.");
            res.status(200).json({ message: "L'utilisateur a bien été supprimé !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static uploadAvatar = async (req, res) => {
        console.log("Uploading user avatar...");
        try {
            const { id_user, img } = req.body;
            await model.userImg(id_user, img);
            console.log("User avatar uploaded successfully.");
            res.status(200).json({ message: "L'avatar a bien été mis à jour !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = MobileController;
