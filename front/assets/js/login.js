document.addEventListener("DOMContentLoaded", function () {
  const loginiForm = document.getElementById("loginForm");

  loginiForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const club_mail = document.getElementById("user_mail").value;
    const password = document.getElementById("user_password").value;

    console.log(club_mail);
    console.log(password);

    // Make a GET request to retrieve user information from the API
    //ici je veux récuperer les données qui sont dans mon api avec la fonction login qui est dans mon controller

    const formData = {
      club_mail: club_mail,
      password: password,
    };
    const jsonData = JSON.stringify(formData);
    console.log(jsonData);

    axios
      .post("http://localhost:8080/user/login", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        // Handle success
        console.log("Réponse reçue :" + response.data);
        //on renvoie au index.html
        //window.location.href = "/front/index.html";
      })
      .catch(function (error) {
        // Handle errors
        console.error("Error:", error);
        // Add any error handling code here
        if (error.response.status === 404) {
          alert(`Utilisateur non trouvé !`);
        } else if (error.response.status === 401) {
          alert(`Mot de passe incorrect !`);
        }
      });
  });

  console.log("JavaScript code loaded successfully!");
});
