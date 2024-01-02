async function updateClubName() {
  console.log("on passe dans la fonction");
  const token = localStorage.getItem("token");
  console.log("Token récupéré :", token);

  if (!token) {
    console.error("Token non trouvé.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/user/getUserInfo", {
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

    // Now, update your DOM elements with the received data
    const clubNameElement = document.querySelector(".text-gray-600.small");
    clubNameElement.textContent = data.club_name; // Adjust according to your data structure

    if (clubName) {
      const clubNameElement = document.querySelector(".text-gray-600.small");
      clubNameElement.textContent = clubName;
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données de l'API :",
      error
    );
  }
}

updateClubName();
