const db = require("../config/db");

class BetModel {
    static getAllBets = async (cb) => {
        const query = "SELECT * FROM bet";
        db.query(query, cb);
    };

    static add = async (id_tournament, id_club, bet_amount, bet_prediction, id_user) => {
        const query = "INSERT INTO bet (id_tournament, id_club, bet_amount, bet_prediction, id_user) VALUES (?, ?, ?, ?, ?)";
        await db.query(query, [id_tournament, id_club, bet_amount, bet_prediction, id_user]);
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
}

module.exports = BetModel;