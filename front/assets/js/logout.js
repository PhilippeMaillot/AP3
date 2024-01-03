document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");
    
    // Ajoutez un gestionnaire d'événements au bouton de déconnexion
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // Supprimez le token du localStorage
            localStorage.removeItem("token"); // Remplacez "votre_token_key" par la clé réelle que vous utilisez
            console.log("Token supprimé. Utilisateur déconnecté.");
            // Redirigez l'utilisateur vers la page de connexion
            window.location.href = "./login.html";
        });
    }
});
