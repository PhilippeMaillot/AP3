class TournamentModel {
    static setTournament(db, req, cb) {
      const { id_tournament, tournament_name, tournament_date, id_field } = req.body;
  
      const query = "INSERT INTO tournament (id_tournament, tournament_name, tournament_date, id_field) VALUES ( ?, ?, ?, ?)";
      db.query(query, [id_tournament, tournament_name, tournament_date, id_field],cb);
    }
  }
  
  module.exports = TournamentModel;
  

  // static setTournament(db, req, cb) {
  //   const { tournament_name, tournament_date, tournament_sport, tournament_town, tournament_field} = req.body;

  //   const query = "INSERT INTO tournament ( , tournament_name, tournament_date, , ) VALUES ( ?, ?, ?, ?, ?)";
  //   db.query(query, [club_name, club_adress, club_town, sport_type, Mail], (err, result) => {
  //     if (err) {
  //       cb(err, null);
  //     } else {
  //       const clubId = result.insertId;
  //       const userData = { clubId, club_name, Mail, password_hash };
  //       ClubModel.setUsers(db, userData, cb);
  //     }
  //   });
  // }
