function tournamentList() {
  const selectElement = document.getElementById("tournamentSelect");
  selectElement.classList.add("form-control");

  // Ajouter l'option par défaut
  const defaultOption = document.createElement("option");
  defaultOption.value = null;
  defaultOption.textContent = "Sélectionnez un tournoi";
  selectElement.appendChild(defaultOption);

  fetch("http://localhost:8080/tournament")
    .then((response) => response.json())
    .then((data) => {
      console.log("data : ", data);

      data.forEach((tournament) => {
        const optionElement = document.createElement("option");
        optionElement.value = tournament.id_tournament;
        optionElement.textContent = tournament.tournament_name;
        selectElement.appendChild(optionElement);
      });

      // Ajouter un event listener pour écouter les changements de sélection
      selectElement.addEventListener("change", function () {
        const selectedTournamentId = this.value; // Mettre à jour l'ID du tournoi sélectionné
        console.log("ID du tournoi sélectionné :", selectedTournamentId);
        fetch(
          `http://localhost:8080/tournament/infopart/${selectedTournamentId}`
        )
          .then((response) => response.json())
          .then((participants) => {
            // Utiliser les données récupérées de l'API pour les participants
            console.log("Données des participations :", participants);

            updateParticipantList(participants, selectedTournamentId);

            // Appeler l'API avec l'ID du tournoi sélectionné pour récupérer les informations du tournoi
            fetch(
              `http://localhost:8080/tournament/info/${selectedTournamentId}`
            )
              .then((response) => response.json())
              .then((data) => {
                // Utiliser les données récupérées de l'API pour obtenir le sport_type du tournoi sélectionné
                const sportType = data[0].sport_type;
                console.log("Sport du tournoi sélectionné :", sportType);

                // Mettre à jour la liste des non participants
                fetchNonParticipantClubs(
                  selectedTournamentId,
                  participants,
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
  fetch("http://localhost:8080/club")
    .then((response) => response.json())
    .then((clubs) => {
      // Filtrer les clubs qui correspondent au sport_type du tournoi sélectionné
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
          fetch("http://localhost:8080/tournament/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_club: club.id_club,
              id_tournament: selectedTournamentId,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Club ajouté au tournoi :", club.club_name);
              // Mise à jour de la liste des participants
              fetch(
                `http://localhost:8080/tournament/infopart/${selectedTournamentId}`
              )
                .then((response) => response.json())
                .then((participants) => {
                  updateParticipantList(
                    participants,
                    selectedTournamentId,
                    sportType
                  );
                  // Après la mise à jour de la liste des participants,
                  // mettre à jour la liste des non participants
                  fetchNonParticipantClubs(
                    selectedTournamentId,
                    participants,
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

function updateParticipantList(participants, id_tournament, sportType) {
  const participantList = document.getElementById("participantList");
  participantList.innerHTML = ""; // Effacer le contenu précédent de la liste des participants

  participants.forEach((participant) => {
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
    button.addEventListener("click", function () {
      // Appeler votre fonction de suppression ici
      fetch("http://localhost:8080/tournament/deleteparticipant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_participation: participant.id_participation,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Club supprimé du tournoi :", participant.club_name);
          fetch(`http://localhost:8080/tournament/infopart/${id_tournament}`)
            .then((response) => response.json())
            .then((participants) => {
              updateParticipantList(participants, id_tournament);
              // Après la mise à jour de la liste des participants,
              // mettre à jour la liste des non participants
              fetchNonParticipantClubs(id_tournament, participants, sportType);
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
            "Erreur lors de la suppression du club dans le tournoi :",
            error
          );
        });
      console.log("Supprimer le club :", participant.club_name);
    });
    listItem.appendChild(button);
    participantList.appendChild(listItem);
  });
  fetch(`http://localhost:8080/tournament/info/${id_tournament}`)
    .then((response) => response.json())
    .then((data) => {
      // Utiliser les données récupérées de l'API pour obtenir le sport_type du tournoi sélectionné
      const sportType = data[0].sport_type;
      fetchNonParticipantClubs(id_tournament, participants, sportType);
    });
}
async function isAdmin() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8080/user/getadmin", {
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

    if (data === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données de l'API :",
      error
    );
  }
}

async function checkAdmin() {
  try {
    const adminStatus = await isAdmin();
    console.log("isAdmin:", adminStatus);

    if (!adminStatus) {
      window.location.href = "./index.html";
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

checkAdmin();
tournamentList();
