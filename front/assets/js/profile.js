async function getProfilInfo() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:8080/user/getUserAndClubInfo", {
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

    // Mise à jour des éléments HTML avec les données récupérées
    document.getElementById("club_name").value = data.club_name; // Pour les éléments de formulaire
    document.getElementById("email").value = data.club_mail; // Pour les éléments de formulaire
    document.getElementById("address").value = data.club_adress;
    document.getElementById("town").value = data.club_town;
    document.getElementById("sport").value = data.sport_type;

    // Désactiver les champs
    document.getElementById("club_name").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("address").disabled = true;
    document.getElementById("town").disabled = true;
    document.getElementById("sport").disabled = true;

    // Masquer le bouton "Sauvegarder les modifications"
    document.getElementById("saveButton").style.display = "none";

  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données de l'API :",
      error
    );
  }
}

getProfilInfo();
