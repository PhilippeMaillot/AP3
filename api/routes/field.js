const express = require('express');
const router = express.Router();
const db = require('../config/db');
const fieldController = require('../controllers/fieldController');

router.get('/', (req, res) => {
    db.query('SELECT * FROM sportfields', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des données : ' + err.message);
        res.status(500).json({ err: 'Erreur serveur' });
        return;
      }
  
      res.status(200).json(results);
    });
  });

router.post('/add', async (req, res) => {fieldController.addField(req, res)});

module.exports = router;