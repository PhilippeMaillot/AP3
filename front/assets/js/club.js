let clubsData = [];

fetch('http://localhost:8080/club') 
.then(response => response.json())
.then(data => {
    clubsData = data;
    displayClubs(clubsData);
})
.catch(error => {
    console.error('Error:', error);
});

function displayClubs(data) {
    let html = '';
    data.forEach(club => {
        html += `
            <div>
                <h3>Nom du club: ${club.club_name}</h3>
                <p>Adresse: ${club.club_adress}</p>
                <p>Type de sports: ${club.sport_type}</p>
                <p>Email: ${club.Mail}</p>
                <p>Ville: ${club.club_town}</p>
            </div>
        `;
    });
    document.getElementById('club-container').innerHTML = html;
}

document.getElementById('sort-select').addEventListener('change', function() {
    let sortedData = [...clubsData];
    if (this.value) {
        sortedData.sort((a, b) => a[this.value].localeCompare(b[this.value]));
    }
    displayClubs(sortedData);
});