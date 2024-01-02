const jwt = require("jsonwebtoken");

document.addEventListener("DOMContentLoaded", function () {
    // Vérifier si un token existe dans le localStorage
    const token = localStorage.getItem("token");
    try {
        const decodedToken = jwt.decode(monToken, { complete: true });
        console.log(decodedToken.payload); // Les données se trouvent dans decodedToken.payload
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
      }
  
    if (!token) {
      // Si aucun token n'est trouvé, rediriger vers la page de connexion
      window.location.href = "./login.html";
    } else {
      // Si un token est trouvé, mettre à jour l'heure de la dernière activité
      localStorage.setItem("lastActivity", new Date().getTime());
    }
  
    // Détecter l'activité de l'utilisateur et mettre à jour l'heure de la dernière activité
    window.onload =
      window.onmousemove =
      window.onclick =
      window.onscroll =
      window.onkeypress =
        function () {
          localStorage.setItem("lastActivity", new Date().getTime());
        };
  
    // Vérifier régulièrement l'inactivité de l'utilisateur
    setInterval(function () {
      const lastActivity = localStorage.getItem("lastActivity");
      const currentTime = new Date().getTime();
  
      // Si l'inactivité dépasse une heure
      if (currentTime - lastActivity > 60 * 60 * 1000) {
        // Supprimer le token JWT
        localStorage.removeItem("token");
        // Rediriger vers la page de connexion
        window.location.href = "./login.html";
      }
    }, 60 * 1000); // Vérifier toutes les minutes
  });