const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    // Récupérez la liste des noms de table depuis votre base de données
    db.query("SHOW TABLES", (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des tables : ' + err.message);
        res.status(500).json({ err: 'Erreur serveur' });
        return;
      }
  
      // Extrayez les noms de table à partir des résultats
      const tables = results.map(result => result[`Tables_in_${db.config.database}`]);
  
      res.status(200).json(tables);
    });
  });

module.exports = router;