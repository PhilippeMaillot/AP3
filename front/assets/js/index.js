import ApiCalls from "./apiCalls.js"
const api = new ApiCalls()

function hidLink() {
  const createTournamentLink = document.querySelector("li.nav-item:nth-child(2)");
  if (createTournamentLink) {
    createTournamentLink.style.display = "none";
  }

  const addSportFieldLink = document.querySelector("li.nav-item:nth-child(5)");
  if (addSportFieldLink) {
    addSportFieldLink.style.display = "none";
  }

  const productListLink = document.querySelector("li.nav-item:nth-child(6)");
  if (productListLink) {
    productListLink.style.display = "none";
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
    await api.updateClubName();

    const isAdmin = await api.isAdmin();

    if (isAdmin === false) {
      hidLink();
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

updateClubNameAndCheckAdmin();
