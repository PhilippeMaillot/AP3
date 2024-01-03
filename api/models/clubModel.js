  class ClubModel {
    static createClubs(db, req, cb) {
      console.log("on passe dans le model");
      console.log("req.body :", req.body);
      const { club_name, club_adress, club_town, sport_type, Mail, password_hash } = req.body;
  
      const query = "INSERT INTO clubs (club_name, club_adress, club_town, sport_type, Mail) VALUES (?, ?, (SELECT town_name FROM town WHERE town_name = ?), ?, ?)";
      db.query(query, [club_name, club_adress, club_town, sport_type, Mail], (err, result) => {
          if (err) {
              console.error("Erreur lors de l'ajout du club : " + err.message);
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

  static getUserInfo(db, userId, cb) {
    console.log('on passe dans le model')
    const query = 'SELECT * FROM users WHERE id_user = ?';
    const promise = new Promise((resolve, reject) => {
      db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
          console.log('result :', results[0]);
        }
      });
    });
    promise
      .then((result) => {
        console.log('result :', result);
        cb(null, result);
      })
      .catch((err) => {
        console.log('err :', err);
        cb(err, null);
      });
  }
}

module.exports = ClubModel;
