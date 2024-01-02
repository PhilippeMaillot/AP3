class TournamentParticipation {
    static addParticipation(db, req, cb) {
        const { id_club, id_tournament } = req.body;

        const query =
            "INSERT INTO tournamentparticipation (id_club, id_tournament) VALUES (?, ?)";
        db.query(query, [id_club, id_tournament], cb);
    }
}
module.exports = TournamentParticipation;