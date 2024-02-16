import HOST from "../config/config.js"
document.addEventListener("DOMContentLoaded", function () {
    const addFieldForm = document.getElementById("addSportField");
  
    addFieldForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
  
      // Collect form data
      const field_adress = document.getElementById("fieldAddress").value;
      const field_town = document.getElementById("fieldTown").value;
      const sport_type = document.getElementById("typeSport").value;    
  
      // Check if any field is empty
      if (field_adress === "") {
        alert('Veuillez remplir le champ "Adresse"');
        return;
      }
      if (field_town === "") {
        alert('Veuillez remplir le champ "Ville"');
        return;
      }
      if (sport_type === "11") {
        alert("Veuillez choisir un sport");
        return;
      }
  
      // Sanitize input to prevent XSS attacks
      const sanitizeHtml = (string) => {
        const temp = document.createElement("div");
        temp.textContent = string;
        return temp.innerHTML;
      };
      const formData = {
        field_adress: sanitizeHtml(field_adress),
        field_town: sanitizeHtml(field_town),
        sport_type: sanitizeHtml(sport_type),
      };
  
      // Convert data to JSON
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);
  
      // Make a POST request using Axios
      axios
        .post(`${HOST}/field/add`, jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          // Handle the success response
          alert("Le complexe a été ajouté avec succès.");
          console.log("Response:", response);
          // Add any additional handling code here
        })
        .catch(function (error) {
          // Handle errors
          console.error("Error:", error);
          // Add any error handling code here
        });
    });
  
    console.log("JavaScript code loaded successfully!");
  });

function updateTownList() {
  fetch(`${HOST}/town`)
    .then((response) => response.json())
    .then((towns) => {
      const fieldTown = document.getElementById("fieldTown");
      // Ajouter une option par défaut
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Choisir la ville";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      fieldTown.appendChild(defaultOption);
      // Ajouter les villes
      towns.forEach((town) => {
        const option = document.createElement("option");
        option.value = town.town_name;
        option.text = town.town_name;
        fieldTown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des données de l'API : ",
        error
      );
    });
}

async function isAdmin() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${HOST}/user/getadmin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    console.log("Données récupérées :", data);

    if (data === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données de l'API :",
      error
    );
  }
}

async function checkAdmin() {
  try {
    const adminStatus = await isAdmin();
    console.log("isAdmin:", adminStatus);

    if (!adminStatus) {
      window.location.href = "./index.html";
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

checkAdmin();
updateTownList();
