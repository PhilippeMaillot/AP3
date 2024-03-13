  class ClubModel {
    static createClubs(db, req, cb) {
      const { club_name, club_adress, club_town, sport_type, Mail, password_hash, role } = req.body;
  
      const query = "INSERT INTO clubs (club_name, club_adress, club_town, sport_type, Mail) VALUES (?, ?, (SELECT town_name FROM town WHERE town_name = ?), ?, ?)";
      db.query(query, [club_name, club_adress, club_town, sport_type, Mail], (err, result) => {
          if (err) {
              console.error("Erreur lors de l'ajout du club : " + err.message);
              cb(err, null);
          } else {
              const clubId = result.insertId;
              const userData = { clubId, club_name, Mail, password_hash, role};
              console.log('userData :', userData);
              ClubModel.setUsers(db, userData, cb);
          }
      });
  }
  

  static setUsers(db, userData, cb) {
    const { clubId, club_name, Mail, password_hash, role} = userData;

    const query = "INSERT INTO users (id_club, club_name, club_mail, password_hash, user_role) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [clubId, club_name, Mail, password_hash, role], cb);
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
    const query = 'SELECT * FROM users WHERE id_user = ?';
    const promise = new Promise((resolve, reject) => {
      db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    promise
      .then((result) => {
        cb(null, result);
      })
      .catch((err) => {
        console.log('err :', err);
        cb(err, null);
      });
  }

  static getUserRole(db, userId, cb) {
    const query = 'SELECT user_role FROM users WHERE id_user = ?';
    db.query(query, [userId], cb);
  }

  
  static getUserAndClubInfo(db, userId, cb) {
    const query = 'SELECT * FROM users INNER JOIN clubs ON users.id_club = clubs.id_club WHERE id_user = ?';
    const promise = new Promise((resolve, reject) => {
      db.query(query, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
    promise
      .then((result) => {
        cb(null, result);
      })
      .catch((err) => {
        console.log('err :', err);
        cb(err, null);
      });
    }
};

module.exports = ClubModel;
