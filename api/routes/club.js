const express = require('express');
const router = express.Router();
const db = require('../config/db');
const clubController = require('../controllers/clubController');
const cookieJwtAuth = require('../middleware/auth-jwt.js');

// Récupération de tous les clubs
router.get('/', (req, res) => {
  db.query('SELECT * FROM clubs', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données : ' + err.message);
      res.status(500).json({ err: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

// Recherche d'un club par son ID
router.get('/:clubId', (req, res) => {
  const clubId = req.params.clubId;

  db.query('SELECT * FROM clubs WHERE id_club = ?', [clubId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données : ' + err.message);
      res.status(500).json({ err: 'Erreur serveur' });
      return;
    }

    // Vérifiez si le club a été trouvé
    if (results.length === 0) {
      res.status(404).json({ err: 'Club non trouvé' });
      return;
    }

    const clubInfo = results[0];
    res.status(200).json(clubInfo);
  });
});


// Ajout d'un club
router.post('/add', (req, res) => {
  try {
    clubController.addClub(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
