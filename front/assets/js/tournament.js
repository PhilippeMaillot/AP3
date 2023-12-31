var selectedSport;
var selectedTown;

function updateTownList() {
  fetch("http://localhost:8080/town")
    .then((response) => response.json())
    .then((towns) => {
      const townSelect = document.getElementById("villeSelect");
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.text = "Choisir la ville";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      townSelect.appendChild(defaultOption);

      towns.forEach((town) => {
        const option = document.createElement("option");
        option.value = town.town_name;
        option.text = town.town_name;
        townSelect.appendChild(option);
      });
      $("#villeSelect").on("select2:select", function (e) {
        selectedTown = e.params.data.id;
        console.log("Ville choisie : " + selectedTown);
        updateFieldList();
      });
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des données de l'API : ",
        error
      );
    });
}

const sportSelect = document.querySelector(".form-select");

// Utiliser Select2 pour gérer les événements de sélection
$("#sportSelect").on("select2:select", function (e) {
  selectedSport = e.params.data.id; // ou e.params.data.text selon ce que vous voulez
  console.log("Sport choisi : " + selectedSport);
  updateFieldList();
});

sportSelect.addEventListener("change", function () {
  selectedSport = this.value;
  console.log("Sport choisi : " + selectedSport);
  updateFieldList();
});

const townSelect = document.querySelector("#villeSelect");
townSelect.addEventListener("change", function () {
  selectedTown = this.value;
  console.log("Ville choisie : " + selectedTown);
  updateFieldList();
});

const fieldSelect = document.querySelector("#fieldSelect");

function updateFieldList() {
  if (selectedSport && selectedTown) {
    fetch("http://localhost:8080/field")
      .then((response) => response.json())
      .then((fields) => {
        while (fieldSelect.firstChild) {
          fieldSelect.removeChild(fieldSelect.firstChild);
        }

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Choisir le terrain";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        fieldSelect.appendChild(defaultOption);

        fields.forEach((field) => {
          if (
            field.field_town === selectedTown &&
            field.sport_type === selectedSport
          ) {
            const option = document.createElement("option");
            option.value = field.id_field;
            option.text = field.field_adress;
            fieldSelect.appendChild(option);
          }
        });
        $("#fieldSelect").on("select2:select", function (e) {
          selectedField = e.params.data.id;
          console.log("Terrain choisi : " + selectedField);
          updateFieldList();
        });
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données de l'API : ",
          error
        );
      });
  }
}

updateTownList();
villeSelect.addEventListener("change", updateFieldList);
sportSelect.addEventListener("change", updateFieldList);

document.addEventListener("DOMContentLoaded", function () {
  const addTournamentForm = document.getElementById("addTournamentForm");

  addTournamentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const tournament_name = document.getElementById("tournament_name").value;
    const tournament_date = document.getElementById("tournament_date").value;
    const tournament_field = document.getElementById("fieldSelect").value;

    // Check if any field is empty
    if (tournament_name === "") {
      alert('Veuillez remplir le champ "Nom du tournoi"');
      return;
    }
    if (tournament_date === "") {
      alert('Veuillez remplir le champ "Date du tournoi"');
      return;
    }
    if (selectedSport === "" || selectedSport === "Choix du sport") {
      alert('Veuillez remplir le champ "Sport"');
      return;
    }

    // Sanitize input to prevent XSS attacks
    const sanitizeHtml = (string) => {
      const temp = document.createElement("div");
      temp.textContent = string;
      return temp.innerHTML;
    };
    const formData = {
      tournament_name: sanitizeHtml(tournament_name),
      tournament_date: sanitizeHtml(tournament_date),
      tournament_field: sanitizeHtml(tournament_field),
    };

    console.log("Form data:", formData);

    // Convert data to JSON
    const jsonData = JSON.stringify(formData);
    console.log("JSON data:", jsonData);

    // Make a POST request using Axios
    axios
      .post("http://localhost:8080/tournament/add", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        // Handle the success response
        console.log("Response:", response.data);
        // Add any additional handling code here
        alert("Tournoi ajouté avec succès !");
        window.location.href = 'calendar.html'
      })
      .catch(function (error) {
        // Handle errors
        console.error("Error:", error);
        // Add any error handling code here
      });
  });

  console.log("JavaScript code loaded successfully!");
});

async function isAdmin() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8080/user/getadmin", {
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

    if (data === "M2L") {
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
