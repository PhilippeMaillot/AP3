const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM town', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des données : ' + err.message);
        res.status(500).json({ err: 'Erreur serveur' });
        return;
      }
  
      res.status(200).json(results);
    });
  });

router.get('/:input', (req, res) => {
    const input = req.params.input;
    // Ici, vous intégreriez la logique pour rechercher la ville dans votre base de données
    // Pour l'exemple, je vais juste renvoyer le mot "input"
    res.json({ message: `Recherche effectuée pour : ${input}` });
});

module.exports = router;