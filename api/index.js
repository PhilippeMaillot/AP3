const express = require('express');
const app = express();
const db = require('./config/db'); // Importez la configuration de la base de données
app.use(express.json()); // Utilisez le middleware express.json() pour analyser les requêtes au format JSON
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}

app.use(cors(corsOptions));

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.message);
  } else {
    console.log('Connexion à la base de données établie');
  }
});

// Routes de l'API
app.get('/sportfields', (req, res) => {
  db.query('SELECT * FROM sportfields', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données : ' + error.message);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données : ' + error.message);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/trainingreservations', (req, res) => {
  db.query('SELECT * FROM trainingreservation', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données : ' + error.message);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/tournamentparticipations', (req, res) => {
  db.query('SELECT * FROM tournamentparticipation', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données : ' + error.message);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/tournaments', (req, res) => {
  db.query('SELECT * FROM tournament', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données : ' + error.message);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/clubs', (req, res) => {
  db.query('SELECT * FROM clubs', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des données : ' + error.message);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/', (req, res) => {
  // Récupérez la liste des noms de table depuis votre base de données
  db.query("SHOW TABLES", (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des tables : ' + error.message);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    // Extrayez les noms de table à partir des résultats
    const tables = results.map(result => result[`Tables_in_${db.config.database}`]);

    res.status(200).json(tables);
  });
});




app.listen(8080, () => {
  console.log('Serveur à l\'écoute');
});
