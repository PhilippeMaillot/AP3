class TournamentModel {
  static setTournament(db, req, cb) {
    const { tournament_name, tournament_date, tournament_field } = req.body;

    const query =
      "INSERT INTO tournament (tournament_name, tournament_date, id_field) VALUES ( ?, ?, ?)";
    db.query(query, [tournament_name, tournament_date, tournament_field], cb);
  }
  getClubs = async () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tournament", (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  };
  static addClubTournament(db, req, cb){
    const { id_tournament, id_club } = req.body;
    const query = "INSERT INTO tournamentparticipation (id_tournament, id_club) VALUES (?, ?)";
    db.query(query, [id_tournament, id_club], cb);
  }
  
}

module.exports = TournamentModel;
