import HOST from "../config/config.js"
let clubsData = [];

fetch(`${HOST}/club`)
  .then((response) => response.json())
  .then((data) => {
    clubsData = data;
    displayClubs(clubsData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function displayClubs(data) {
  let html = "";
  data.forEach((club) => {
    // Ajouter une condition pour ne pas afficher les clubs avec club_name égal à "M2L"
    if (club.club_name !== "M2L") {
      html += `
                <div>
                    <hr></hr>
                    <h3>${club.club_name}</h3>
                    <p>Adresse: ${club.club_adress}</p>
                    <p>Type de sports: ${club.sport_type}</p>
                    <p>Email: ${club.Mail}</p>
                    <p>Ville: ${club.club_town}</p>
                </div>
            `;
    }
  });
  document.getElementById("club-container").innerHTML = html;
}

document.getElementById("sort-select").addEventListener("change", function () {
  let sortedData = [...clubsData];
  if (this.value) {
    sortedData.sort((a, b) => a[this.value].localeCompare(b[this.value]));
  }
  displayClubs(sortedData);
});
