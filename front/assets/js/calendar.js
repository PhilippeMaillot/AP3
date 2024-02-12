document.addEventListener("DOMContentLoaded", function () {
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

  const deleteTournamentButton = document.getElementById("deleteButton");
  deleteTournamentButton.addEventListener("click", () => {
    fetch("http://localhost:8080/tournament/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_tournament: currentTournamentId, // Utilise l'ID du tournoi stocké
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Le tournoi a été supprimé avec succès."); // Affiche un message
        window.location.reload(); // Rafraîchit la page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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

  async function showPopup(tournamentId) {
    console.log("Tournament ID:", tournamentId);
    currentTournamentId = tournamentId;
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const clubList = document.getElementById("clubList");

    if (popup && overlay && clubList) {
      popup.style.display = "block";
      overlay.style.display = "block";
      clubList.style.display = "block";

      try {
        const [tournamentInfoResponse, participantListResponse] =
          await Promise.all([
            fetch(
              `http://localhost:8080/tournament/info/${currentTournamentId}`
            ),
            fetch(
              `http://localhost:8080/tournament/infopart/${currentTournamentId}`
            ),
          ]);

        if (!tournamentInfoResponse.ok || !participantListResponse.ok) {
          throw new Error(`HTTP error!`);
        }

        const tournamentInfo = await tournamentInfoResponse.json();
        const participants = await participantListResponse.json();

        // Vérifiez si le tableau a des éléments
        if (Array.isArray(tournamentInfo) && tournamentInfo.length > 0) {
          const tournamentData = tournamentInfo[0]; // Prenez le premier élément du tableau

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

          // Afficher la liste des participants
          console.log("Participations:", participants);
          const participantList = document.getElementById("participantList");
          if (participantList) {
            participantList.innerHTML = "<h4>Participants actuels :</h4>";
            for (const participation of participants) {
              const participantItem = document.createElement("div");
              participantItem.innerHTML = `
                <p>${participation.club_name}</p>
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
        } else {
          console.error(
            "Le tableau de données est vide ou n'est pas un tableau."
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données depuis l'API :",
          error
        );
      }
    }

    function deleteParticipantFromTournament(clubId) {
      console.log("Club ID to delete:", clubId);
      fetch("http://localhost:8080/tournament/deleteparticipant", {
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
  }
  function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const clubList = document.getElementById("clubList");
    popup.style.display = "none";
    overlay.style.display = "none";
    clubList.innerHTML = "";
  }
  const updateButton = document.getElementById("updateButton");

  updateButton.addEventListener("click", function () {
    window.location.href = "updatetournament.html";
  });
});

async function getTournamentSport(tournamentId) {
  try {
    const response = await fetch(
      `http://localhost:8080/tournament/tournamentinfo?id_tournament=${tournamentId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Vérifiez si le tableau a des éléments
    if (Array.isArray(data) && data.length > 0) {
      const tournamentData = data[0]; // Prenez le premier élément du tableau
      const sportType = tournamentData.sport_type;
      console.log("Sport type:", sportType);
      return sportType;
    } else {
      console.error("Le tableau de données est vide ou n'est pas un tableau.");
      return null;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données du type de sport depuis l'API :",
      error
    );
    return null;
  }
}
