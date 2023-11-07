class TournamentModel {
    static setTournament(db, req, cb) {
      const { id_tournament, tournament_name, tournament_date, id_field } = req.body;
  
      const query = "INSERT INTO tournament (id_tournament, tournament_name, tournament_date, id_field) VALUES ( ?, ?, ?, ?)";
      db.query(query, [id_tournament, tournament_name, tournament_date, id_field],cb);
    }
  }
  
  module.exports = TournamentModel;
  