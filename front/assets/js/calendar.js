document.addEventListener("DOMContentLoaded", function () {
  let clubsData = [];
  let currentTournamentId;

  const closePopupButton = document.getElementById("closePopup");
  if (closePopupButton) {
    closePopupButton.addEventListener("click", function () {
      // Ferme le pop-up
      closePopup();
    });
  } else {
    console.error("L'élément #closePopup n'a pas été trouvé dans le DOM.");
  }

  fetch("http://localhost:8080/tournament")
    .then((response) => response.json())
    .then((data) => {
      const upcomingTournaments = data.filter((tournament) => {
        const tournamentDate = new Date(tournament.tournament_date);
        const currentDate = new Date();
        return tournamentDate >= currentDate;
      });

      upcomingTournaments.sort((a, b) => {
        const dateA = new Date(a.tournament_date);
        const dateB = new Date(b.tournament_date);
        return dateA - dateB;
      });

      createCalendar(upcomingTournaments);
    })
    .catch((error) =>
      console.error(
        "Erreur lors de la récupération des données depuis l'API:",
        error
      )
    );

  // Récupération des clubs depuis l'API
  fetch("http://localhost:8080/club")
    .then((response) => response.json())
    .then((data) => {
      const clubContainer = document.getElementById("clubContainer");
      const clubSelect = document.createElement("select");
      clubSelect.classList.add("w-full", "max-h-60", "overflow-auto");

      data.forEach((club) => {
        // Ajouter une condition pour ne pas créer d'option lorsque club_name est égal à "M2L"
        if (club.club_name !== "M2L") {
          const clubOption = document.createElement("option");
          clubOption.value = club.id_club;
          clubOption.textContent = `Nom : ${club.club_name}, ${club.sport_type}`;
          clubSelect.appendChild(clubOption);
        }
      });

      clubContainer.appendChild(clubSelect);

      clubSelect.addEventListener("change", () => {
        const selectedClubId = clubSelect.value;
        console.log(`Club sélectionné: ${selectedClubId}`);
      });

      // Ajouter le club sélectionné à la base de données tournamentparticipation
      const addClubButton = document.getElementById("addClubButton");
      addClubButton.addEventListener("click", () => {
        const selectedClubId = clubSelect.value;
        console.log(`Club sélectionné: ${selectedClubId}`);

        fetch("http://localhost:8080/tournament/addparticipation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_club: selectedClubId,
            id_tournament: currentTournamentId, // Utilise l'ID du tournoi stocké
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            alert("Le club a été ajouté au tournoi avec succès."); // Affiche un message
            window.location.reload(); // Rafraîchit la page
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  function createCalendar(data) {
    const calendar = document.getElementById("calendar");

    data.forEach((tournament) => {
      const date = new Date(tournament.tournament_date);
      const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
      const year = date.getFullYear();

      const calendarItem = document.createElement("div");
      calendarItem.innerHTML = `<strong>${day}/${month}/${year}</strong> ${tournament.tournament_name}`;

      const detailsButton = document.createElement("button");
      detailsButton.className = "details-button";
      detailsButton.innerHTML = "Voir les détails";

      detailsButton.addEventListener("click", function () {
        showPopup(tournament.id_tournament);
      });

      calendarItem.appendChild(detailsButton);
      calendar.appendChild(calendarItem);
    });
  }

  function showPopup(tournamentId) {
    currentTournamentId = tournamentId;
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    if (popup && overlay) {
      popup.style.display = "block";
      overlay.style.display = "block";


      fetch(`http://localhost:8080/tournament/tournamentinfo?id_tournament=${tournamentId}`)
      .then((response) => response.json())
      .then((data) => {
          console.log("Réponse :", data);
  
          // Vérifiez si le tableau a des éléments
          if (Array.isArray(data) && data.length > 0) {
              const tournamentData = data[0]; // Prenez le premier élément du tableau
  
              // Ajoutez la liste déroulante et le bouton à votre popup
              const popupContent = document.getElementById("popupContent");
              popupContent.innerHTML = `
                  <div class="popup-columns">
                      <div id="participantList" class="column"></div>
                      <div id="clubContainer" class="column">
                          <!-- Ajoutez vos éléments ici, par exemple, une liste déroulante et un bouton -->
                          <label for="tournamentField">Adresse : ${tournamentData.field_adress}</label>
                          <br>
                          <label for="tournamentTown">Ville : ${tournamentData.field_town}</label>
                          <br>    
                          <label for="sportType">Sport : ${tournamentData.sport_type}</label>
                      </div>
                  </div>
              `;
          } else {
              console.error("Le tableau de données est vide ou n'est pas un tableau.");
          }
      })
      .catch((error) => {
          console.error("Erreur lors de la récupération des données depuis l'API :", error);
      });
  

      // Afficher la liste des participants
      fetch(
        `http://localhost:8080/tournament/participations?id_tournament=${tournamentId}`
      )
        .then((response) => response.json())
        .then(async (participations) => {
          const participantList = document.getElementById("participantList");
          if (participantList) {
            participantList.innerHTML = "<h4>Participants actuels :</h4>";
            for (const participation of participations) {
              const participantItem = document.createElement("div");
              participantItem.innerHTML = `
                          <p><strong>Nom :</strong> ${participation.club_name}
                              <span class="delete-participant" data-club-id="${participation.id_club}"> &#x232B;</span>
                          </p>
                      `;
              participantList.appendChild(participantItem);
            }

            // Ajoutez un écouteur d'événements pour chaque bouton de suppression
            const deleteButtons = document.querySelectorAll(
              ".delete-participant"
            );
            deleteButtons.forEach((button) => {
              button.addEventListener("click", function () {
                const clubIdToDelete = this.getAttribute("data-club-id");
                // Appelez votre fonction de suppression ici
                deleteParticipantFromTournament(clubIdToDelete);
              });
            });
          } else {
            console.error(
              "L'élément #participantList n'a pas été trouvé dans le DOM."
            );
          }
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des participations:",
            error
          )
        );
    } else {
      console.error(
        "Les éléments #popup et #overlay n'ont pas été trouvés dans le DOM."
      );
    }
  }

  function deleteParticipantFromTournament(clubId) {
    fetch("http://localhost:8080/tournament/deleteparticipation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_club: clubId,
        id_tournament: currentTournamentId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Le club a été supprimé du tournoi avec succès.");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    popup.style.display = "none";
    overlay.style.display = "none";
  }
});
