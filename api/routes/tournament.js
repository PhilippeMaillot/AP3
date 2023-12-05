const express = require("express");
const router = express.Router();
const db = require("../config/db");
const tournamentController = require("../controllers/tournamentController");

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
  db.query("SELECT * FROM tournamentparticipation", (err, results) => {
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

router.post("/add", async (req, res) => {
  try {
    await tournamentController.addTournament(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
