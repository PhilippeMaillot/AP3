async function updateClubName() {
  console.log("on passe dans la fonction");
  const token = localStorage.getItem("token");
  console.log("Token récupéré :", token);

  if (!token) {
    console.error("Token non trouvé.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/user/getUserInfo", {
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

    // Now, update your DOM elements with the received data
    const clubNameElement = document.querySelector(".text-gray-600.small");
    clubNameElement.textContent = data.club_name; // Adjust according to your data structure
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données de l'API :",
      error
    );
  }
}

async function getAdminByToken() {
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

function hideCreateTournamentLink() {
  const createTournamentLink = document.querySelector(
    "li.nav-item:nth-child(2)"
  ); // Sélectionnez l'élément du lien "Créer un tournoi" en fonction de votre structure HTML
  createTournamentLink.style.display = "none";

  const addClubLink = document.querySelector(
    "#addClubButton"
    );
    addClubLink.style.display = "none";
}

async function updateClubNameAndCheckAdmin() {
  try {
    await updateClubName(); // Attend que la fonction updateClubName soit terminée

    const isAdmin = await getAdminByToken();

    if (!isAdmin) {
      hideCreateTournamentLink();
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

updateClubNameAndCheckAdmin();
