const express = require("express");
const router = express.Router();
const db = require("../config/db");
const clubController = require("../controllers/clubController");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
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

router.post("/id", async (req, res) => {
  clubController.getUserId(req, res);
});

router.post("/login", async (req, res) => {
  try {
    await clubController.login(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getUserInfo", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token non fourni dans le header de la requête.");
    }

    const decodedToken = jwt.verify(token, process.env.MY_SECRET_KEY);
    if (!decodedToken) {
      throw new Error("Décodage du token échoué ou propriété 'id' manquante.");
    }

    const userId = decodedToken.id;
    clubController.getUserInfo(userId, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getUserAndClubInfo", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token non fourni dans le header de la requête.");
    }

    const decodedToken = jwt.verify(token, process.env.MY_SECRET_KEY);
    if (!decodedToken) {
      throw new Error("Décodage du token échoué ou propriété 'id' manquante.");
    }

    const userId = decodedToken.id;
    clubController.getUserAndClubInfo(userId, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getadmin", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token non fourni dans le header de la requête.");
    }

    const decodedToken = jwt.verify(token, process.env.MY_SECRET_KEY);
    if (!decodedToken) {
      throw new Error("Décodage du token échoué ou propriété 'id' manquante.");
    }

    const role = decodedToken.role;
    res.status(200).json(role);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
