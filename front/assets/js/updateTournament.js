import ApiCalls from "./apiCalls.js";
const api = new ApiCalls();

function tournamentList() {
  const selectElement = document.getElementById("tournamentSelect");
  selectElement.classList.add("form-control");

  const defaultOption = document.createElement("option");
  defaultOption.value = null;
  defaultOption.textContent = "Sélectionnez un tournoi";
  selectElement.appendChild(defaultOption);

  api.fetchTournament()
    .then((data) => {
      const upcomingTournaments = data[0].filter(tournament => {
        const tournamentDate = new Date(tournament.tournament_date);
        const currentDate = new Date();

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
        return tournamentDateWithoutTime >= currentDateWithoutTime;
      });

      upcomingTournaments.sort((a, b) => {
        const dateA = new Date(a.tournament_date);
        const dateB = new Date(b.tournament_date);
        return dateA - dateB;
      });

      upcomingTournaments.forEach((tournament) => {
        const optionElement = document.createElement("option");
        optionElement.value = tournament.id_tournament;
        optionElement.textContent = tournament.tournament_name;
        selectElement.appendChild(optionElement);
      });

      selectElement.addEventListener("change", function () {
        const selectedTournamentId = this.value;
        api
          .tournamentInfoPart(selectedTournamentId)
          .then((participants) => {
            const tournamentParts = participants[0];

            updateParticipantList(tournamentParts, selectedTournamentId);

            api
              .tournamentInfos(selectedTournamentId)
              .then((data) => {
                const allDatas = data[0];
                const sportType = allDatas[0].sport_type;
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

function fetchNonParticipantClubs(
  selectedTournamentId,
  participants,
  sportType
) {
  api.fetchClub()
    .then((clubs) => {
      clubs = clubs[0];
      const filteredClubs = clubs.filter(
        (club) => club.sport_type === sportType
      );

      const nonParticipantClubs = filteredClubs.filter((club) => {
        return !participants.some(
          (participant) => participant.id_club === club.id_club
        );
      });

      const nonParticipantList = document.getElementById("nonParticipantList");
      nonParticipantList.innerHTML = "";

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
          api.addParticipant( club.id_club, selectedTournamentId)
            .then((data) => {
              console.log("Club ajouté au tournoi :", club.club_name);
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
  participantList.innerHTML = "";

  for (const participant of participants) {
    const listItem = document.createElement("li");
    listItem.textContent = participant.club_name;
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const button = document.createElement("button");
    button.textContent = "-->";
    button.classList.add("btn", "btn-primary", "btn-sm");
    
    button.addEventListener("click", async function () {
      try {
        console.log('participant', participant.id_participation)
        const id_participation = participant.id_participation;
        await api.deleteParticipant(id_participation);
        console.log("Club supprimé du tournoi :", participant.club_name);
        
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
