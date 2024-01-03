const express = require("express");
const router = express.Router();
const db = require("../config/db");
const tournamentController = require("../controllers/tournamentController");
const TournamentParticipation = require('../models/tournamentParticipation');
const TournamentControllerParticipation = require("../controllers/tournamentControllerParticipation");
const tournamentControllerDeleteParticipation = require("../controllers/tournamentControllerDeleteParticipation");
const TournamentDeleteParticipation = require("../controllers/tournamentControllerParticipation")

router.get("/", (req, res) => {
  db.query("SELECT * FROM tournament", (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des données : " + err.message
      );
      res.status(500).json({ err: "Erreur serveur" });
      return;
    }

    res.status(200).json(results);
  });
});

router.get("/participations", (req, res) => {
  // Si le paramètre id_tournament est présent dans la requête
  if (req.query.id_tournament) {
    const tournamentId = req.query.id_tournament;

    // Utilisez tournamentId dans votre requête SQL pour filtrer les résultats
    db.query(
      "SELECT tournamentparticipation.*, clubs.* " +
      "FROM tournamentparticipation " +
      "INNER JOIN clubs ON tournamentparticipation.id_club = clubs.id_club " +
      "WHERE tournamentparticipation.id_tournament = ?",
      [tournamentId],
      (err, results) => {
        if (err) {
          console.error(
            "Erreur lors de la récupération des données : " + err.message
          );
          res.status(500).json({ err: "Erreur serveur" });
          return;
        }

        res.status(200).json(results);
      }
    );
  } else {
    // Si le paramètre id_tournament n'est pas présent, renvoyez une erreur 400 Bad Request
    res.status(400).json({ err: "Paramètre id_tournament manquant" });
  }
});


router.post("/add", async (req, res) => {
  try {
    await tournamentController.addTournament(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addclub", async (req, res) => {
  try {
      await tournamentController.addClub(req, res);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/addparticipation", async (req, res) => { 
  try {
    await TournamentControllerParticipation.addParticipation(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

;
router.post("/deleteparticipation", async (req, res) => {
  try {
      await tournamentControllerDeleteParticipation.deleteClubTournament(req, res);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;