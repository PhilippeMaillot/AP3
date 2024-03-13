import HOST from "../config/config.js";

class ApiCalls {
  // Méthodes pour les tournois
  async tournamentInfos(tournamentId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/tournament/info/${tournamentId}`, {
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
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async tournamentInfoPart(tournamentId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/tournament/infopart/${tournamentId}`, {
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
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async fetchTournament() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/tournament`, {
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
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async addTournament(tournamentData) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/tournament/set`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: tournamentData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding tournament:", error);
      return [];
    }
  }

  async deleteTournament(tournamentId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${HOST}/tournament/delete/${tournamentId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting tournament:", error);
      return [];
    }
  }

  async deleteParticipant(id_participation) {
    const token = localStorage.getItem("token");
    fetch(`${HOST}/tournament/deleteparticipant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_participation: id_participation,
      }),
    })
  }

  async addParticipant(id_club, id_tournament) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/tournament/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_club: id_club,
          id_tournament: id_tournament,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding participant:", error);
      return [];
    }
  }

  // Méthodes pour les clubs

  async fetchClub() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/club`, {
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
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async addClub(clubData) {
    const token = localStorage.getItem("token");
    console.log(clubData);
    try {
      const response = await fetch(`${HOST}/club/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: clubData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding club:", error);
      return [];
    }
  }

  // Méthodes pour les utilisateurs

  async getUserAndClubInfo() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/user/getUserAndClubInfo`, {
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
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async isAdmin() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${HOST}/user/getadmin`, {
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
      const userRole = data[0].user_role;
      
      if (userRole === 1) {
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

  async checkAdmin() {
    try {
      const adminStatus = await this.isAdmin();
      if (!adminStatus) {
        window.location.href = "./index.html";
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  }

  async updateClubName() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token non trouvé.");
      return;
    }
    try {
      const response = await fetch(`${HOST}/user/getUserInfo`, {
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
      const clubNameElement = document.querySelector(".text-gray-600.small");
      clubNameElement.textContent = data.club_name;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données de l'API :",
        error
      );
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${HOST}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ club_mail: email, password: password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Méthodes pour les villes

  async fetchTown() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/town`, {
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
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Méthodes pour les terrains

  async fetchField() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/field`, {
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
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async addField(fieldData) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/field/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: fieldData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding field:", error);
      return [];
    }
  }

  // Méthodes pour les produits

  async fetchProducts() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/product`, {
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
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async addProduct(formData) {
    const token = localStorage.getItem("token");
    fetch(`${HOST}/product/add`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  }

  async deleteProduct(productId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${HOST}/product/delete/${productId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting product:", error);
      return [];
    }
  }

  async showImages() {
    const token = localStorage.getItem('token')
    const selectElement = document.getElementById("selectedImage");
    selectElement.innerHTML = '<option value="">Sélectionnez une image</option>';
    const requestOptions = {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    };
    fetch(`${HOST}/product/images`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((image) => {
          const option = document.createElement("option");
          option.value = image.filename;
          option.textContent = image.filename;
          option.style.backgroundImage = `url('${HOST}${image.path}')`;
          option.style.backgroundSize = "cover";
          selectElement.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }
}

export default ApiCalls;
