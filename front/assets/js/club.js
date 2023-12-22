fetch('http://localhost:8080/club') 
.then(response => response.json())
.then(data => {
    let html = '';
    data.forEach(club => {
        html += `
            <div>
                <h3>${club.club_name}</h3>
                <p>Address: ${club.club_adress}</p>
                <p>Sport Type: ${club.sport_type}</p>
                <p>Email: ${club.Mail}</p>
                <p>Town: ${club.club_town}</p>
            </div>
        `;
    });
    document.getElementById('club-container').innerHTML = html;
})
.catch(error => {
    console.error('Error:', error);
});