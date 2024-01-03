document.addEventListener("DOMContentLoaded", function () {
  let clubsData = [];
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
  fetch('http://localhost:8080/club')
  .then(response => response.json())
  .then(data => {
      const clubContainer = document.getElementById('clubContainer');
      const clubSelect = document.createElement('select');
      clubSelect.classList.add('w-full', 'max-h-60', 'overflow-auto'); // Tailwind classes for full width, max height and scroll
      data.forEach(club => {
          const clubOption = document.createElement('option');
          clubOption.value = club.id_club;
          clubOption.textContent = `Nom du club: ${club.club_name}, Type de sport: ${club.sport_type}`;
          clubSelect.appendChild(clubOption);
      });
      clubContainer.appendChild(clubSelect);

      clubSelect.addEventListener('change', () => {
          const selectedClubId = clubSelect.value;
          console.log(`Club sélectionné: ${selectedClubId}`);
          // Vous pouvez effectuer une action lorsque le club est sélectionné

          // Ajouter le club sélectionné à la base de données tournamentparticipation
          const addClubButton = document.getElementById('addClubButton');

          addClubButton.addEventListener('click', () => {
            const selectedClubId = clubSelect.value;
            console.log(`Club sélectionné: ${selectedClubId}`);
          
            fetch('http://localhost:8080/tournament/addparticipation', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  id_club: selectedClubId,
                  id_tournament: currentTournamentId, // Utilise l'ID du tournoi stocké
              }),
          })
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              alert('Le club a été ajouté au tournoi avec succès.'); // Affiche un message
              window.location.reload(); // Rafraîchit la page
          })
          .catch((error) => {
              console.error('Error:', error);
          });
        });
      });
  })
  .catch(error => {
      console.error('Error:', error);
  });
  function createCalendar(data) {
      const calendar = document.getElementById("calendar");

      data.forEach((tournament) => {
          const date = new Date(tournament.tournament_date);
          const day = date.getDate();
          const month = date.getMonth() + 1; 
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
  let currentTournamentId; // Variable globale pour stocker l'ID du tournoi actuel

  function showPopup(tournamentId) {
      currentTournamentId = tournamentId;
      const popup = document.getElementById("popup");
      const overlay = document.getElementById("overlay");

      

      if (popup && overlay) {
          popup.style.display = "block";
          overlay.style.display = "block";

          // Ajoutez la liste déroulante et le bouton à votre popup
          const popupContent = document.getElementById('popupContent');
          popupContent.innerHTML = `
              <h3>Clubs participants :</h3>
              <div id="participantList"></div>
           
             
             
          `;

          // Afficher la liste des participants
          fetch(
              `http://localhost:8080/tournament/participations?id_tournament=${tournamentId}`
          )
              .then((response) => response.json())
              .then(async (participations) => {
                  const participantList = document.getElementById("participantList");
                  if (participantList) {
                      participantList.innerHTML = '<h4>Participants actuels :</h4>';
                      for (const participation of participations) {
                          participantList.innerHTML += `
                              <p><strong>Nom :</strong> ${participation.club_name}</p>
                          `;
                      }
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

// Supposons que l'ID de l'élément de sélection du tournoi est 'tournamentSelect'
const tournamentSelect = document.getElementById('tournamentSelect');
const selectedTournamentId = tournamentSelect.value;

// Faites une requête GET à la route /participations pour obtenir l'ID du tournoi
fetch(`http://localhost:8080/tournament/participations?id_tournament=${selectedTournamentId}`)
.then(response => response.json())
.then(data => {
    const tournamentId = data[0].id_tournament; // Supposons que l'ID du tournoi est dans le premier objet du tableau de résultats

    // Utilisez tournamentId dans votre requête POST pour ajouter une participation
    fetch('http://localhost:8080/tournament/addparticipation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_club: selectedClubId,
            id_tournament: tournamentId,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
.catch((error) => {
    console.error('Error:', error);
});
              fetch(
                  `http://localhost:8080/tournament/participations?id_tournament=${tournamentId}`
              )
                  .then((response) => response.json())
                  .then(async (participations) => {
                      const participantList = document.getElementById("participantList");
                      if (participantList) {
                          participantList.innerHTML = '<h4>Participants actuels :</h4>';
                          for (const participation of participations) {
                              participantList.innerHTML += `
                                  <p><strong>Nom :</strong> ${participation.club_name}</p>
                              `;
                          }
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
          })
          .catch((error) => {
              console.error('Error:', error);
          });
  

  function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    popup.style.display = "none";
    overlay.style.display = "none";
}
;
