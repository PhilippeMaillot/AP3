class ClubModel {
    static setClubs(db, req, cb) {
      const { club_name, club_adress, club_city, sport_type, Mail } = req.body;
  
      const query = "INSERT INTO clubs ( club_name, club_adress, club_city, sport_type, Mail) VALUES ( ?, ?, ?, ?, ?)";
      db.query(query, [club_name, club_adress, club_city, sport_type, Mail],cb);
    }
  }
  
  module.exports = ClubModel;
  