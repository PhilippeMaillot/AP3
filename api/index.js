const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const clubRouter = require('./routes/club');
const fieldRouter = require('./routes/field');
const trainingRouter = require('./routes/training');
const tournamentRouter = require('./routes/tournament');
const townRouter = require('./routes/town');
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.message);
  } else {
    console.log('Connexion à la base de données établie');
  }
});

app.use(express.json()); // Utilisez le middleware express.json() pour analyser les requêtes au format JSON
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Autoriser spécifiquement ce domaine
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Routes de l'API
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/club', clubRouter);
app.use('/field', fieldRouter);
app.use('/training', trainingRouter);
app.use('/tournament', tournamentRouter);
app.use('/town', townRouter);

app.listen(8080, () => {
  console.log('Serveur à l\'écoute');
});