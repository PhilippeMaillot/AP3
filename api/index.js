const express = require('express');
const app = express();
app.use(express.json()); // Utilisez le middleware express.json() pour analyser les requêtes au format JSON
const cors = require('cors');
const fieldController = require('./controllers/fieldController');
const clubController = require('./controllers/clubController');
const db = require('./config/db');

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
  db.query('SELECT * FROM sportfields', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données : ' + err.message);
      res.status(500).json({ err: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données : ' + err.message);
      res.status(500).json({ err: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/trainingreservations', (req, res) => {
  db.query('SELECT * FROM trainingreservation', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données : ' + err.message);
      res.status(500).json({ err: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/tournamentparticipations', (req, res) => {
  db.query('SELECT * FROM tournamentparticipation', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données : ' + err.message);
      res.status(500).json({ err: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/tournaments', (req, res) => {
  db.query('SELECT * FROM tournament', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données : ' + err.message);
      res.status(500).json({ err: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/clubs', (req, res) => {
  db.query('SELECT * FROM clubs', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données : ' + err.message);
      res.status(500).json({ err: 'Erreur serveur' });
      return;
    }

    res.status(200).json(results);
  });
});

app.get('/', (req, res) => {
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

app.post('/sportfields/add', async (req, res) => {fieldController.addField(req, res)});

app.post('/clubs/add', (req, res) => {clubController.addClub(req, res)});

app.listen(8080, () => {
  console.log('Serveur à l\'écoute');
});