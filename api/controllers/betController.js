const model = require("../models/betModel");

class BetController {
    static getAllBets = async (req, res) => {
        try {
            model.getAllBets((err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Erreur serveur" });
                } else {
                    res.status(200).json(results);
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static add = async (req, res) => {
        try {
            const { id_tournament, id_club, bet_amount, bet_prediction, id_user } = req.body;                
            await model.add(id_tournament, id_club, bet_amount, bet_prediction, id_user);
            res.status(200).json({ message: "Le pari a bien été ajouté !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static update = async (req, res) => {
        try {
            const { id_bet, id_tournament, id_club, bet_amount, bet_prediction } = req.body;
    
            const updatedFields = [];
    
            if (id_tournament) {
                await model.updateTournament(id_bet, id_tournament);
                updatedFields.push("id_tournament");
            }
    
            if (id_club) {
                await model.updateClub(id_bet, id_club);
                updatedFields.push("id_club");
            }
    
            if (bet_amount) {
                await model.updateBetAmount(id_bet, bet_amount);
                updatedFields.push("bet_amount");
            }
    
            if (bet_prediction) {
                await model.updateBetPrediction(id_bet, bet_prediction);
                updatedFields.push("bet_prediction");
            }    
            res.status(200).json({ message: `La ou les donnée(s) suivante(s) a/ont été mise(s) à jour : ${updatedFields.join(', ')}` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static delete = async (req, res) => {
        try {
            const { id_bet } = req.body;
            await model.delete(id_bet);
            res.status(200).json({ message: "Le pari a bien été supprimé !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static getInfo = async (req, res) => {
        try {
            const { id_bet } = req.body;
            model.getInfo(id_bet, (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Erreur serveur" });
                } else {
                    res.status(200).json(results);
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

module.exports = BetController;

