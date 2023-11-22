class TournamentModel {
  static setTournament(db, req) {
    const { tournament_name, tournament_date, tournament_field} = req.body;

    const query = "INSERT INTO tournament (tournament_name, tournament_date, id_field) VALUES ( ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.query(query, [tournament_name, tournament_date, tournament_field], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = TournamentModel;