import ApiCalls from "./apiCalls.js";
const api = new ApiCalls();

function tournamentList() {
  const selectElement = document.getElementById("tournamentSelect");
  selectElement.classList.add("form-control");

  // Ajouter l'option par défaut
  const defaultOption = document.createElement("option");
  defaultOption.value = null;
  defaultOption.textContent = "Sélectionnez un tournoi";
  selectElement.appendChild(defaultOption);

  api.fetchTournament()
    .then((data) => {

      data[0].forEach((tournament) => {
        const optionElement = document.createElement("option");
        optionElement.value = tournament.id_tournament;
        optionElement.textContent = tournament.tournament_name;
        selectElement.appendChild(optionElement);
      });

      // Ajouter un event listener pour écouter les changements de sélection
      selectElement.addEventListener("change", function () {
        const selectedTournamentId = this.value; // Mettre à jour l'ID du tournoi sélectionné
        api
          .tournamentInfoPart(selectedTournamentId)
          .then((participants) => {
            const tournamentParts = participants[0];

            updateParticipantList(tournamentParts, selectedTournamentId);

            // Appeler l'API avec l'ID du tournoi sélectionné pour récupérer les informations du tournoi
            api
              .tournamentInfos(selectedTournamentId)
              .then((data) => {
                const allDatas = data[0];
                const sportType = allDatas[0].sport_type;
                // Mettre à jour la liste des non participants
                fetchNonParticipantClubs(
                  selectedTournamentId,
                  participants[0],
                  sportType
                );
              })
              .catch((error) => {
                console.error(
                  "Erreur lors de la récupération des informations du tournoi :",
                  error
                );
              });
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données des participations :",
              error
            );
          });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fonction pour mettre à jour la liste des non participants
function fetchNonParticipantClubs(
  selectedTournamentId,
  participants,
  sportType
) {
  api.fetchClub()
    .then((clubs) => {
      // Filtrer les clubs qui correspondent au sport_type du tournoi sélectionné
      clubs = clubs[0];
      const filteredClubs = clubs.filter(
        (club) => club.sport_type === sportType
      );

      // Filtrer les clubs non participants en vérifiant s'ils ne sont pas déjà dans la liste des participants
      const nonParticipantClubs = filteredClubs.filter((club) => {
        return !participants.some(
          (participant) => participant.id_club === club.id_club
        );
      });

      // Afficher les clubs non participants dans la liste nonParticipantList
      const nonParticipantList = document.getElementById("nonParticipantList");
      nonParticipantList.innerHTML = ""; // Effacer le contenu précédent de la liste

      nonParticipantClubs.forEach((club) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        const clubName = document.createElement("span");
        clubName.textContent = club.club_name;
        listItem.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );
        listItem.appendChild(clubName);

        const button = document.createElement("button");
        button.textContent = "<--";
        button.classList.add("btn", "btn-primary", "btn-sm");
        button.addEventListener("click", function () {
          // Ensuite, vous pouvez effectuer votre appel POST à votre API
          api.addParticipant( club.id_club, selectedTournamentId)
            .then((data) => {
              console.log("Club ajouté au tournoi :", club.club_name);
              // Mise à jour de la liste des participants
              api
                .tournamentInfoPart(selectedTournamentId)
                .then((participants) => {
                  const tournamentParts = participants[0];
                  updateParticipantList(
                    tournamentParts,
                    selectedTournamentId,
                    sportType
                  );
                  fetchNonParticipantClubs(
                    selectedTournamentId,
                    tournamentParts,
                    sportType
                  );
                })
                .catch((error) => {
                  console.error(
                    "Erreur lors de la récupération des données des participations :",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Erreur lors de l'ajout du club au tournoi :",
                error
              );
            });
        });

        listItem.appendChild(button);
        nonParticipantList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des clubs :", error);
    });
}

async function updateParticipantList(participants, id_tournament, sportType) {
  const participantList = document.getElementById("participantList");
  participantList.innerHTML = ""; // Effacer le contenu précédent de la liste des participants

  // Utiliser une boucle for...of pour itérer à travers les participants
  for (const participant of participants) {
    const listItem = document.createElement("li");
    listItem.textContent = participant.club_name;
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    ); // Utilisation des classes de Bootstrap pour le positionnement

    const button = document.createElement("button");
    button.textContent = "-->";
    button.classList.add("btn", "btn-primary", "btn-sm");
    
    button.addEventListener("click", async function () {
      try {
        console.log('participant', participant.id_participation)
        // Appeler votre fonction de suppression ici
        const id_participation = participant.id_participation;
        await api.deleteParticipant(id_participation);
        console.log("Club supprimé du tournoi :", participant.club_name);
        
        // Mettre à jour la liste des participants et les clubs non participants
        const participants = await api.tournamentInfoPart(id_tournament);
        await Promise.all([
          updateParticipantList(participants[0], id_tournament, sportType),
          fetchNonParticipantClubs(id_tournament, participants[0], sportType)
        ]);
      } catch (error) {
        console.error("Erreur lors de la suppression du club du tournoi :", error);
      }
    });

    listItem.appendChild(button);
    participantList.appendChild(listItem);
  }

  fetchNonParticipantClubs(id_tournament, participants, sportType);
}


api.checkAdmin();
tournamentList();
