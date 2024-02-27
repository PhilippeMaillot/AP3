const express = require('express');
const router = express.Router();
const db = require('../config/db');
const clubController = require('../controllers/clubController');

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


router.post('/add', (req, res) => {
  try {
      clubController.addClub(req, res);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
