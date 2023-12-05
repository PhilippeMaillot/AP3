const jwt = require("jsonwebtoken");
require('dotenv').config();

// Midddlewares d'authentification avec jwt
// Méthode avec les cookies
cookieJwtAuth = (req, res, next) => {
  // On récupère le token dans le cookie
  const token = req.cookies['token'];

  console.log(token);

  // On vérifie le token avec la clé secrète
  try {
    const user = jwt.verify(token, process.env.MY_SECRET_KEY);

    // On ajoute les infos utilisateurs à la requete
    req.user = user;

    // On passe au middleware suivant
    next();
  } catch (err) {

    // Si le token n'est pas valide, on le supprime
    res.clearCookie("token");
    // Et on redirige vers la page de login (qui est aussi /)
    return res.redirect("/login");
  }
};

module.exports = cookieJwtAuth;