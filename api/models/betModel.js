const db = require("../config/db");
const db2 = require("../config/db2");

class BetModel {
  static getAllBets = async (cb) => {
    const query = "SELECT * FROM bet";
    db.query(query, cb);
  };

  static add = async (
    id_tournament,
    id_club,
    bet_amount,
    bet_prediction,
    id_user
  ) => {
    const query =
      "INSERT INTO bet (id_tournament, id_club, bet_amount, bet_prediction, id_user) VALUES (?, ?, ?, ?, ?)";
    await db.query(query, [
      id_tournament,
      id_club,
      bet_amount,
      bet_prediction,
      id_user,
    ]);
  };

  static getInfo = async (id_bet, cb) => {
    const query = "SELECT * FROM bet WHERE id_bet = ?";
    db.query(query, [id_bet], cb);
  };

  static updateTournament = async (id_bet, newTournament) => {
    const query = "UPDATE bet SET id_tournament = ? WHERE id_bet = ?";
    await db.query(query, [newTournament, id_bet]);
  };

  static updateClub = async (id_bet, newClub) => {
    const query = "UPDATE bet SET id_club = ? WHERE id_bet = ?";
    await db.query(query, [newClub, id_bet]);
  };

  static updateBetAmount = async (id_bet, newBetAmount) => {
    const query = "UPDATE bet SET bet_amount = ? WHERE id_bet = ?";
    await db.query(query, [newBetAmount, id_bet]);
  };

  static updateBetPrediction = async (id_bet, newBetPrediction) => {
    const query = "UPDATE bet SET bet_prediction = ? WHERE id_bet = ?";
    await db.query(query, [newBetPrediction, id_bet]);
  };

  static delete = async (id_bet) => {
    const query = "DELETE FROM bet WHERE id_bet = ?";
    await db.query(query, [id_bet]);
  };

  static getByUser = async (id_user, cb) => {
    const query = "SELECT * FROM bet WHERE id_user = ?";
    db.query(query, [id_user], cb);
  };

  static processBets = async () => {
    console.log("Traitement des paris en cours...");
    const currentDate = new Date().toISOString().slice(0, 10);

    const getTournamentsQuery =
      "SELECT id_tournament FROM tournament WHERE tournament_date < ?";
    const getBetsQuery =
      "SELECT id_bet, id_user, bet_amount, bet_prediction FROM bet WHERE id_tournament = ?";
    const updateUserBalanceQuery =
      "UPDATE mobile_user SET balance = balance + ? WHERE id_user = ?";
    const deleteBetQuery = "DELETE FROM bet WHERE id_bet = ?";

    try {
      const [tournaments] = await db2
        .promise()
        .query(getTournamentsQuery, [currentDate]);

      for (const tournament of tournaments) {
        const tournamentId = tournament.id_tournament;
        const outcome = Math.random() < 0.5 ? "Victoire" : "Défaite";

        const [bets] = await db2.promise().query(getBetsQuery, [tournamentId]);

        for (const bet of bets) {
          const betId = bet.id_bet;
          const userId = bet.id_user;
          const betAmount = bet.bet_amount;
          const betPrediction = bet.bet_prediction;

          if (betPrediction === outcome) {
            await db2
              .promise()
              .query(updateUserBalanceQuery, [betAmount * 2, userId]);
          }

          await db2.promise().query(deleteBetQuery, [betId]);
        }
      }
    } catch (error) {
      console.error("Erreur lors du traitement des paris : ", error);
      throw error;
    }
  };
}

module.exports = BetModel;
