async function updateClubName() {
  const token = localStorage.getItem("token");

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

function hidLink() {
  const createTournamentLink = document.querySelector("li.nav-item:nth-child(2)");
  if (createTournamentLink) {
    createTournamentLink.style.display = "none";
  }

  const addSportFieldLink = document.querySelector("li.nav-item:nth-child(5)");
  if (addSportFieldLink) {
    addSportFieldLink.style.display = "none";
  }

  const updateClubLink = document.querySelector("#updateButton");
  if (updateClubLink) {
    updateClubLink.style.display = "none";
  }

  const deleteTournamentButton = document.querySelector("#deleteButton");
  if (deleteTournamentButton) {
    deleteTournamentButton.style.display = "none";
  }

  const addClubLink = document.querySelector("#addClubButton");
  if (addClubLink) {
    addClubLink.style.display = "none";
  }
}

async function updateClubNameAndCheckAdmin() {
  try {
    await updateClubName(); // Attend que la fonction updateClubName soit terminée

    const isAdmin = await getAdminByToken();

    if (isAdmin === false) {
      hidLink();
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

updateClubNameAndCheckAdmin();
