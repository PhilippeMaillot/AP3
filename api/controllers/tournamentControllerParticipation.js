const db = require("../config/db");
const model = require("../models/tournamentParticipation");

class TournamentControllerParticipation {
    static async addParticipation(req, res) {
      try {
        await model.addParticipation(db, req, (err, results) => {
          if (err) {
            console.error("Erreur lors de l'ajout de la participation :", err.message);
            res.status(500).json({ err: "Erreur serveur" });
            return;
          }
          res.status(200).json({ message: "Le club a bien été ajouté aux participations !" });
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Erreur serveur" });
      }
    }
  }
  
  module.exports = TournamentControllerParticipation;
  