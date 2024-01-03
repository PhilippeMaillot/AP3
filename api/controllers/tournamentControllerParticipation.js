const db = require("../config/db");
const TournamentParticipation = require("../models/tournamentParticipation");

class TournamentControllerParticipation {
    static async deleteClubTournament(req, res) {
        try {
            await TournamentParticipation.deleteClubTournament(db, req, (err, results) => {
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

module.exports = TournamentControllerParticipation;
