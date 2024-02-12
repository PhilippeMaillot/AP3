const db = require("../config/db");
class TournamentModel {
  static getAllTournaments = async (cb) => {
    const query = "SELECT * FROM tournament";
    db.query(query, cb);
  };

  static getInfo = async (id_tournament, cb) => {
    const query = `
        SELECT tournament.*, sportfields.field_adress, sportfields.sport_type, sportfields.field_town
        FROM tournament
        INNER JOIN sportfields ON tournament.id_field = sportfields.id_field
        WHERE tournament.id_tournament = ?`;
    db.query(query, [id_tournament], cb);
  };

  static getInfoParticipation = async (id_tournament) => {
    const query = `
        SELECT clubs.id_club, clubs.club_name, tournamentparticipation.id_participation
        FROM tournamentparticipation
        INNER JOIN clubs ON tournamentparticipation.id_club = clubs.id_club
        WHERE tournamentparticipation.id_tournament = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [id_tournament], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
  };

  static set = async (tournament_name, tournament_date, id_field) => {
    const query = "INSERT INTO tournament (tournament_name, tournament_date, id_field) VALUES (?, ?, ?)";
    db.query(query, [tournament_name, tournament_date, id_field]);
  };

  static add = async ( id_club, id_tournament) => {
    const query = "INSERT INTO tournamentparticipation (id_club, id_tournament) VALUES (?, ?)";
    db.query(query, [ id_club, id_tournament]);
  };

  static delete(id_tournament) {
    console.log("l'id du tournois", id_tournament);
    const query = "DELETE FROM tournament WHERE id_tournament = ?";
    db.query(query, [id_tournament]);
  }

  static updateName = async (id_tournament, newTournamentName) => {
    const query = "UPDATE tournament SET tournament_name = ? WHERE id_tournament = ?";
    await db.query(query, [newTournamentName, id_tournament]);
  };

  static updateDate = async (id_tournament, newTournamentDate) => {
    const query = "UPDATE tournament SET tournament_date = ? WHERE id_tournament = ?";
    await db.query(query, [newTournamentDate, id_tournament]);
  };

  static updateField = async (id_tournament, newFieldId) => {
    const query = "UPDATE tournament SET id_field = ? WHERE id_tournament = ?";
    await db.query(query, [newFieldId, id_tournament]);
  };

  static updateClub = async (id_participation, newClubId) => {
    const query = "UPDATE tournamentparticipation SET id_club = ? WHERE id_participation = ?";
    await db.query(query, [newClubId, id_participation]);
  };

  static updateTournament = async (id_participation, newTournamentId) => {
    const query = "UPDATE tournamentparticipation SET id_tournament = ? WHERE id_participation = ?";
    await db.query(query, [newTournamentId, id_participation]);
  };

  static deleteParticipation = async (id_participation) => {
    const query = "DELETE FROM tournamentparticipation WHERE id_participation = ?";
    console.log('query : ' , id_participation);
    await db.query(query, [id_participation]);
  };  
}

module.exports = TournamentModel;
