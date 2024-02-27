import ApiCalls from "./apiCalls.js";

const api = new ApiCalls();
async function getProfilInfo() {
  try {
    const data = await api.getUserAndClubInfo();
    const userData = data[0];

    // Mise à jour des éléments HTML avec les données récupérées
    document.getElementById("club_name").value = userData.club_name; // Pour les éléments de formulaire
    document.getElementById("email").value = userData.club_mail; // Pour les éléments de formulaire
    document.getElementById("address").value = userData.club_adress;
    document.getElementById("town").value = userData.club_town;
    document.getElementById("sport").value = userData.sport_type;

    // Désactiver les champs
    document.getElementById("club_name").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("town").disabled = true;
    document.getElementById("sport").disabled = true;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données de l'API :",
      error
    );
  }
}

getProfilInfo();
