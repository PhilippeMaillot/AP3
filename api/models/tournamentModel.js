class TournamentModel {
  static setTournament(db, req, cb) {
    const { tournament_name, tournament_date, tournament_field } = req.body;

    const query =
      "INSERT INTO tournament (tournament_name, tournament_date, id_field) VALUES ( ?, ?, ?)";
    db.query(query, [tournament_name, tournament_date, tournament_field], cb);
  }
}

module.exports = TournamentModel;
