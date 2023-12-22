document.addEventListener("DOMContentLoaded", function () {
  // Récupération des données depuis l'API (remplacez l'URL par votre propre API)
  fetch("http://localhost:8080/tournament")
    .then((response) => response.json())
    .then((data) => {
      // Filtre les tournois dont la date est dans le passé
      const upcomingTournaments = data.filter((tournament) => {
        const tournamentDate = new Date(tournament.tournament_date);
        const currentDate = new Date();
        return tournamentDate >= currentDate;
      });

      // Trie les tournois par date croissante
      upcomingTournaments.sort((a, b) => {
        const dateA = new Date(a.tournament_date);
        const dateB = new Date(b.tournament_date);
        return dateA - dateB;
      });

      // Appel de la fonction pour créer le calendrier avec les données triées
      createCalendar(upcomingTournaments);
    })
    .catch((error) =>
      console.error(
        "Erreur lors de la récupération des données depuis l'API:",
        error
      )
    );
});

function createCalendar(data) {
  const calendar = document.getElementById("calendar");

  data.forEach((tournament) => {
    const date = new Date(tournament.tournament_date);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois sont indexés de 0 à 11
    const year = date.getFullYear();

    const calendarItem = document.createElement("div");
    calendarItem.innerHTML = `<strong>${day}/${month}/${year}</strong> ${tournament.tournament_name}`;

    const detailsButton = document.createElement("button");
    detailsButton.className = "details-button";
    detailsButton.innerHTML = "Voir les détails";

    detailsButton.addEventListener("click", function () {
      // Affiche le pop-up et charge les détails du tournoi
      showPopup(tournament.id_tournament);
    });

    calendarItem.appendChild(detailsButton);
    calendar.appendChild(calendarItem);
  });
}

function showPopup(tournamentId) {
  // Affiche le pop-up et l'overlay
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  if (popup && overlay) {
    popup.style.display = "block";
    overlay.style.display = "block";

    // Récupère les participations pour le tournoi sélectionné
    fetch(
      `http://localhost:8080/tournament/participations?id_tournament=${tournamentId}`
    )
      .then((response) => response.json())
      .then(async (participations) => {
        console.log(participations);

        // Affiche les détails du tournoi
        const popupContent = document.getElementById("popupContent");

        if (popupContent) {
          popupContent.innerHTML = `<h3>Clubs participants :</h3>`;

          // Pour chaque participation, affiche les informations du club
          for (const participation of participations) {
            popupContent.innerHTML += `
                <p><strong>Nom :</strong> ${participation.club_name}</p>
              `;
          }
        } else {
          console.error(
            "L'élément #popupContent n'a pas été trouvé dans le DOM."
          );
        }
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des participations:",
          error
        )
      );

    // Gestionnaire d'événements pour le bouton de fermeture du pop-up
    const closePopupButton = document.getElementById("closePopup");

    if (closePopupButton) {
      closePopupButton.addEventListener("click", function () {
        // Ferme le pop-up
        closePopup();
      });
    } else {
      console.error("L'élément #closePopup n'a pas été trouvé dans le DOM.");
    }
  } else {
    console.error(
      "Les éléments #popup et #overlay n'ont pas été trouvés dans le DOM."
    );
  }
}

function closePopup() {
  // Cache le pop-up et l'overlay
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  popup.style.display = "none";
  overlay.style.display = "none";
}