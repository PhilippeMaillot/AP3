const db = require("../config/db");
const model = require("../models/tournamentModel");

class TournamentController {
  static getAllTouranements = async (req, res) => {
    try {
      model.getAllTournaments((err, results) => {
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

  static getInfo = async (req, res) => {
    try {
      const { id_tournament } = req.params; // Utilisez req.params pour récupérer les paramètres d'URL
      model.getInfo(id_tournament, (err, results) => {
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

  static infoParticipation = async (req, res) => {
    try {
      const { id_tournament } = req.params;
      // Appeler la fonction du modèle pour récupérer les informations de participation
      const participationInfo = await model.getInfoParticipation(id_tournament);
      res.status(200).json(participationInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //setTournament
  static setTournament = async (req, res) => {
    try {
      const { tournament_name, tournament_date, id_field } = req.body;
      await model.set(tournament_name, tournament_date, id_field);
      res.status(200).json({ message: "Le tournois a bien été ajouté !" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Erreur serveur" });
    }
  };

  //addparticipant
  static addClub = async (req, res) => {
    try {
      const { id_club, id_tournament } = req.body;
      await model.add(id_club, id_tournament);
      res
        .status(200)
        .json({ message: "Le club a bien été ajouté au tournoi !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static update = async (req, res) => {
    try {
      const { id_tournament, tournament_name, tournament_date, id_field } =
        req.body;

      const updatedFields = [];

      if (tournament_name) {
        await model.updateName(id_tournament, tournament_name);
        updatedFields.push("Nom du tournoi");
      }

      if (tournament_date) {
        await model.updateDate(id_tournament, tournament_date);
        updatedFields.push("date");
      }

      if (id_field) {
        await model.updateField(id_tournament, id_field);
        updatedFields.push("Terrain");
      }
      res.status(200).json({
        message: `La ou les donnée(s) suivante(s) a/ont été mise(s) à jour : ${updatedFields.join(
          ", "
        )}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static updateParticipant = async (req, res) => {
    try {
      const { id_participation, id_club, id_tournament } = req.body;

      const updatedFields = [];

      if (id_club) {
        await model.updateClub(id_participation, id_club);
        updatedFields.push("Club");
      }

      if (id_tournament) {
        await model.updateTournament(id_participation, id_tournament);
        updatedFields.push("Tournoi");
      }
      res.status(200).json({
        message: `La ou les donnée(s) suivante(s) a/ont été mise(s) à jour : ${updatedFields.join(
          ", "
        )}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static deleteTournament = async (req, res) => {
    try {
      const { id_tournament } = req.params;
      model.delete(id_tournament);
      res.status(200).json({ message: "Le tournoi a bien été supprimé !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static deleteParticipant = async (req, res) => {
    try {
      const id_participation = req.body.id_participation;
      console.log('id part dans le controller',id_participation);
      await model.deleteParticipation(id_participation);
      res.status(200).json({ message: "Le participant a bien été supprimé !" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = TournamentController;
