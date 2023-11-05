const db = require("../config/db");
const model = require("../models/clubModel");

class ClubController {
    static addClub(req, res) {
        try {
        model.setClubs(db, req, (err, results) => {
            if (err) {
              res.status(500).json({ err: "Erreur serveur" });
            } else {
              res.status(200).json({ message: "Le club a bien été ajouté !" });
            }
          });
        } catch (err) {
          res.status(500).json({ err: "Erreur serveur" });
        }
    }
}

module.exports = ClubController;