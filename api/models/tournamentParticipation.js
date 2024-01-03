class TournamentParticipation {
    static addParticipation(db, req, cb) {
        const { id_club, id_tournament } = req.body;

        const query =
            "INSERT INTO tournamentparticipation (id_club, id_tournament) VALUES (?, ?)";
        db.query(query, [id_club, id_tournament], cb);
    }

    static deleteClubTournament(db, req, cb) {
        const { id_tournament, id_club } = req.body;
        console.log("Trying to delete participation. Tournament ID:", id_tournament, "Club ID:", id_club);

        const query = "DELETE FROM tournamentparticipation WHERE id_tournament = ? AND id_club = ?";
        db.query(query, [id_tournament, id_club], (err, result) => {
            if (err) {
                console.error("Error deleting participation:", err.message);
                cb(err, null);
                return;
            }
            console.log("Successfully deleted participation. Rows affected:", result.affectedRows);
            cb(null, result);
        });
    }
}

module.exports = TournamentParticipation;
