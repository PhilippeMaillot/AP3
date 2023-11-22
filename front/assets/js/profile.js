// Fetch club data from the API
fetch("http://localhost:8080/club")
  .then((response) => response.json())
  .then((clubs) => {
    console.log(clubs);
    const clubId = clubs.find((club) => club.id_club === 96);
    const clubName = clubs.find((club) => club.club_name === clubId.club_name);
    // Update the input fields with the club data
    document.getElementById("club_name").value = clubName;
    document.getElementById("email").value = clubs.Mail;
    document.getElementById("address").value = clubs.club_adress;
    document.getElementById("town").value = clubs.club_town;
    document.getElementById("sport").value = clubs.sport_type;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
