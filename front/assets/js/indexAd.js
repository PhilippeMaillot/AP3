import ApiCalls from "./apiCalls.js";
const api = new ApiCalls();

api.fetchClub().then(clubsArray => {
    if (Array.isArray(clubsArray) && clubsArray.length > 0) {
        const clubs = clubsArray[0];
        const numberOfClubs = clubs.length;
        document.querySelector('.card-title-users').textContent = numberOfClubs;
    } else {
        console.error('La réponse de l\'API n\'est pas conforme:', clubsArray);
    }
}).catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des clubs:', error);
});

api.fetchTournament().then(tournamentsArray => {
    if (Array.isArray(tournamentsArray) && tournamentsArray.length > 0) {
        const tournaments = tournamentsArray[0];
        const numberOfTournament = tournaments.length;
        document.querySelector('.card-title-tournament').textContent = numberOfTournament;
    } else {
        console.error('La réponse de l\'API n\'est pas conforme:', tournamentsArray);
    }
}).catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des tournois:', error);
});

api.fetchUsers().then(usersArray => {
    console.log('userarray : ' , usersArray);
    if (Array.isArray(usersArray) && usersArray.length > 0) {
        console.log(usersArray);
        const users = usersArray[0];
        const numberOfUser = users.length;
        document.querySelector('.card-title-mobile').textContent = numberOfUser;
        } else {
            console.error('la réponse de l\'API n\'est pas conforme:', usersArray);
        }
}).catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des tournois:', error);
});


api.fetchTournament().then(tournamentsArray => {
    if (Array.isArray(tournamentsArray) && tournamentsArray.length > 0) {
        const tournaments = tournamentsArray[0];
        const currentDate = new Date();
        const upcomingTournaments = tournaments.filter(tournament => {
            const tournamentDate = new Date(tournament.tournament_date);
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
        document.querySelector('.card-title-going-tournament').textContent = upcomingTournaments.length;
    } else {
        console.error('La réponse de l\'API n\'est pas conforme:', tournamentsArray);
    }
}).catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des tournois:', error);
});