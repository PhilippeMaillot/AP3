import ApiCalls from "./apiCalls.js";
let clubsData = [];
const api = new ApiCalls();

api.fetchClub().then((data) => {
  clubsData = data[0];
  displayClubs(clubsData);
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

/*document.getElementById("sort-select").addEventListener("change", function () {
  let sortedData = [...clubsData];
  if (this.value) {
    sortedData.sort((a, b) => a[this.value].localeCompare(b[this.value]));
  }
  displayClubs(sortedData);
});*/

document.getElementById("search").addEventListener("input", function () {
  let searchString = this.value.toLowerCase();
  let searchOption = document.getElementById("search-option").value;
  let filteredData = clubsData.filter((club) =>
    club[searchOption].toLowerCase().includes(searchString)
  );
  displayClubs(filteredData);

  if (filteredData.length === 0) {
    document.getElementById("club-container").innerHTML =
      "<p>Pas de résultat trouvé pour votre recherche.</p>";
  }
});

document.getElementById("search-option").addEventListener("change", function () {
  let searchString = document.getElementById("search").value.toLowerCase();
  let searchOption = this.value;
  let filteredData = clubsData.filter((club) =>
    club[searchOption].toLowerCase().includes(searchString)
  );
  displayClubs(filteredData);
});

