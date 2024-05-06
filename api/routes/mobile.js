const express = require("express");
const router = express.Router();
const db = require("../config/db");
const clubController = require("../controllers/clubController");
const jwt = require("jsonwebtoken");

// Importez le middleware verifyToken à partir du fichier auth.js
const verifyToken = require("../middleware/auth");

// Les routes existantes restent inchangées
router.get("/", verifyToken, (req, res) => {
  // Votre logique de route
});

router.post("/id", async (req, res) => {
  // Votre logique de route
});

router.post("/login", async (req, res) => {
  // Votre logique de route
});

router.get("/getUserInfo", verifyToken, async (req, res) => {
  // Votre logique de route
});

router.get("/getUserAndClubInfo", verifyToken, async (req, res) => {
  // Votre logique de route
});

router.get("/getadmin", verifyToken, async (req, res) => {
  // Votre logique de route
});

module.exports = router;
