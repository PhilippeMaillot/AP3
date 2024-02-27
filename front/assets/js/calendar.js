import ApiCalls from "./apiCalls.js";
const api = new ApiCalls();
document.addEventListener("DOMContentLoaded", function () {
  let currentTournamentId;

  const closePopupButton = document.getElementById("closePopup");
  if (closePopupButton) {
    closePopupButton.addEventListener("click", function () {
      closePopup();
    });
  } else {
    console.error("L'élément #closePopup n'a pas été trouvé dans le DOM.");
  }

  api.fetchTournament()
  .then(data => {
    // Filtrer les tournois à venir
    const upcomingTournaments = data[0].filter(tournament => {
      // Convertir les dates en objets Date
      const tournamentDate = new Date(tournament.tournament_date);
      const currentDate = new Date();
  
      // Ignorer l'heure, les minutes et les secondes
      const tournamentDateWithoutTime = new Date(
          tournamentDate.getFullYear(),
          tournamentDate.getMonth(),
          tournamentDate.getDate()
      );
      const currentDateWithoutTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
      );
      // Comparer les dates sans tenir compte de l'heure
      return tournamentDateWithoutTime >= currentDateWithoutTime;
  });
  

    // Trier les tournois à venir par date
    upcomingTournaments.sort((a, b) => {
      const dateA = new Date(a.tournament_date);
      const dateB = new Date(b.tournament_date);
      return dateA - dateB;
    });

    // Appeler la fonction createCalendar avec les tournois à venir
    createCalendar(upcomingTournaments);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données du tournoi:', error);
  });

  const deleteTournamentButton = document.getElementById("deleteButton");
  deleteTournamentButton.addEventListener("click", () => {
    api.deleteTournament(currentTournamentId)
    alert("Le tournoi a été supprimé avec succès.");
    window.location.reload();
  });

  function createCalendar(data) {
    const calendar = document.getElementById("calendar");

    data.forEach((tournament) => {
      const date = new Date(tournament.tournament_date);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
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
            api.tournamentInfos(currentTournamentId),
            api.tournamentInfoPart(currentTournamentId),
          ]);

        if (
          tournamentInfoResponse.length === 0 || participantListResponse.length === 0
        ) {
          throw new Error(`Erreur HTTP!`);
        }

        const tournamentInfo = tournamentInfoResponse[0];
        const participants = participantListResponse[0];

        if (Array.isArray(tournamentInfo) && tournamentInfo.length > 0) {
          const tournamentData = tournamentInfo[0];

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
