  class ClubModel {
  static createClubs(db, req, cb) {
    const { club_name, club_adress, club_city, sport_type, Mail, password_hash } = req.body;

    const query = "INSERT INTO clubs ( club_name, club_adress, club_city, sport_type, Mail) VALUES ( ?, ?, ?, ?, ?)";
    db.query(query, [club_name, club_adress, club_city, sport_type, Mail], (err, result) => {
      if (err) {
        cb(err, null);
      } else {
        const clubId = result.insertId;
        const userData = { clubId, club_name, Mail, password_hash };
        ClubModel.setUsers(db, userData, cb);
      }
    });
  }

  static setUsers(db, userData, cb) {
    const { clubId, club_name, Mail, password_hash } = userData;

    const query = "INSERT INTO users (id_club, club_name, club_mail, password_hash) VALUES (?, ?, ?, ?)";
    db.query(query, [clubId, club_name, Mail, password_hash], cb);
  }

  static getUserId(db, id_user, cb) {
    const query = 'SELECT * FROM users WHERE id_user = ?';
    db.query(query, [id_user], cb);
  }

  static login(db, email, cb) {
    const query = 'SELECT * FROM users WHERE club_mail = ?';
    db.query(query, [email], cb);
  }
}

module.exports = ClubModel;
