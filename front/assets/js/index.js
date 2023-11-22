function updateClubName() {
    // Effectuer une requête à l'API en utilisant Fetch
    fetch('http://localhost:8080/club')
        .then(response => response.json())
        .then(clubs => {
            // Rechercher le club avec id_club : 3
            const clubId = clubs.find(club => club.id_club === 96);

            if (clubId) {
                // Mettre à jour le nom du club dans le code HTML
                const clubNameElement = document.querySelector('.text-gray-600.small');
                clubNameElement.textContent = clubId.club_name;
            }
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des données de l\'API : ', error);
        });
}

updateClubName();