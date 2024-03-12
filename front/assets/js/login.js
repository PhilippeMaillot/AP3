import ApiCalls from "./apiCalls.js";
const api = new ApiCalls();
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const club_mail = document.getElementById("user_mail").value;
    const password = document.getElementById("user_password").value;

    api.login(club_mail, password)
      .then((data) => {
        if (data.message === "User logged in") {
          const token = data.token;
          localStorage.setItem("token", token);
          window.location.href = "/front/index.html";
        } else if (data.message === "Mot de passe incorrect") {
          var message = "Mot de passe incorrect !";
          afficherPopup(message);
        } else {
          var message = "Utilisateur non trouvé !";
          afficherPopup(message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        if (error.response.status === 404) {
          console.log(error.response.status);
          alert(`Utilisateur non trouvé !`);
        } else if (error.response.status === 401) {
          alert(`Mot de passe incorrect !`);
        }
      });
  });

  console.log("JavaScript code loaded successfully!");
});

function afficherPopup(message) {
  var popup = document.getElementById("popup");
  var popupMessage = document.getElementById("popup-message");
  popupMessage.innerHTML = message;
  popup.style.display = "block"; // Afficher le popup
  setTimeout(fermerPopup, 1000);
}

// Fonction pour fermer le popup
function fermerPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none"; // Cacher le popup
}