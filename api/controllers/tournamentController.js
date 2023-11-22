const db = require("../config/db");
const model = require("../models/tournamentModel");

class TournamentController {
  static async addTournament(req, res) {
    try {
      await model.setTournament(db, req);
      res.status(200).json({ message: "Le tournois a bien été ajouté !" });
    } catch (err) {
      res.status(500).json({ err: "Erreur serveur" });
    }
  }
}

module.exports = TournamentController;