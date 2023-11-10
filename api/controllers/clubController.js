const db = require("../config/db");
const model = require("../models/clubModel");

class ClubController {
    static addClub(req, res) {
        try {
        model.createClubs(db, req, (err, results) => {
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

    static getUserId(req, res) {
      try {
          console.log('ID de l\'utilisateur reçu :', req.body.id_user);
          model.getUserId(db, req.body.id_user, (err, results) => {
              if (err) {
                  res.status(500).json({ err: "Erreur serveur" });
              } else {
                  res.status(200).json(results);
              }
          });
      } catch (err) {
          res.status(500).json({ err: "Erreur serveur" });
      }
  }
}

module.exports = ClubController;