const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const clubRouter = require('./routes/club');
const fieldRouter = require('./routes/field');
const trainingRouter = require('./routes/training');
const tournamentRouter = require('./routes/tournament');
const townRouter = require('./routes/town');
const mobileUserRouter = require('./routes/mobile');
const betRouter = require('./routes/bet');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const { verifyToken } = require("./middleware/jwtUtils");


// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.message);
  } else {
    console.log('Connexion à la base de données établie');
  }
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/club',  clubRouter);
app.use('/field',  fieldRouter);
app.use('/training',  trainingRouter);
app.use('/tournament',  tournamentRouter);
app.use('/town',  townRouter);
app.use('/mobileuser', mobileUserRouter); // Ne pas utiliser verifyToken middleware ici
app.use('/bet', betRouter);
app.use('/product', productRouter);
app.use('/cart',  cartRouter);

app.listen(8080, () => {
  console.log('Serveur à l\'écoute');
});
