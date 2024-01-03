const db = require("../config/db");
const model = require("../models/tournamentModel");

class TournamentController {
  static async addTournament(req, res) {
    try {
      model.setTournament(db, req);
      res.status(200).json({ message: "Le tournois a bien été ajouté !" });
    } catch (err) {
      res.status(500).json({ err: "Erreur serveur" });
    }
  }
  static async addClubTournament(req, res) {
    try {
      model.addClubTournament(db, req);
      res.status(200).json({ message: "Le club a bien été ajouté !" });
    } catch (err) {
      res.status(500).json({ err: "Erreur serveur" });
    }
  }

  static async deleteClubTournament(req, res) {
    try {
      model.deleteClubTournament(db, req, (err, results) => {
        if (err) {
          console.error("Erreur lors de la suppression de la participation :", err.message);
          res.status(500).json({ err: "Erreur serveur" });
          return;
        }
        res.status(200).json({ message: "Le club a bien été supprimé des participations !" });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Erreur serveur" });
    }
  }
}

module.exports = TournamentController;