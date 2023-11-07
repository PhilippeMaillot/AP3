const db = require("../config/db");
const model = require("../models/tournamentModel");

class TournamentController {
    static addTournament(req, res) {
        try {
            model.setTournament(db, req, (err, results) => {
                if (err) {
                  res.status(500).json({ err: "Erreur serveur" });
                } else {
                  res.status(200).json({ message: "Le tournois a bien été ajouté !" });
                }
              });
            } catch (err) {
              res.status(500).json({ err: "Erreur serveur" });
            }
    }

}

module.exports = TournamentController;