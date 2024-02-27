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
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        if (error.response.status === 404) {
          alert(`Utilisateur non trouvé !`);
        } else if (error.response.status === 401) {
          alert(`Mot de passe incorrect !`);
        }
      });
  });

  console.log("JavaScript code loaded successfully!");
});
