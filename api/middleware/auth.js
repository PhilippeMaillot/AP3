// auth.js

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token non fourni dans le header de la requête.");
    }

    const decodedToken = jwt.verify(token, process.env.MY_SECRET_KEY);
    if (!decodedToken) {
      throw new Error("Décodage du token échoué ou propriété 'id' manquante.");
    }

    req.user = decodedToken; // Ajoutez l'utilisateur décodé à l'objet req

    next(); // Appel suivant dans la chaîne de middleware
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Unauthorized" }); // Retournez une erreur 401 pour l'authentification invalide
  }
}

module.exports = verifyToken;
