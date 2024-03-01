import HOST from "../config/config.js";

class ApiCalls {
  // Méthodes pour les tournois
  async tournamentInfos(tournamentId) {
    try {
      const response = await fetch(`${HOST}/tournament/info/${tournamentId}`);
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async tournamentInfoPart(tournamentId) {
    try {
      const response = await fetch(
        `${HOST}/tournament/infopart/${tournamentId}`
      );
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async fetchTournament() {
    try {
      const response = await fetch(`${HOST}/tournament`);
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async addTournament(tournamentData) {
    try {
      const response = await fetch(`${HOST}/tournament/set`, {
        method: "POST",
        headers: {
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
    try {
      const response = await fetch(
        `${HOST}/tournament/delete/${tournamentId}`,
        {
          method: "POST",
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
    fetch(`${HOST}/tournament/deleteparticipant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_participation: id_participation,
      }),
    })
  }

  async addParticipant(id_club, id_tournament) {
    try {
      const response = await fetch(`${HOST}/tournament/add`, {
        method: "POST",
        headers: {
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
    try {
      const response = await fetch(`${HOST}/club`);
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async addClub(clubData) {
    try {
      const response = await fetch(`${HOST}/club/add`, {
        method: "POST",
        headers: {
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
    try {
      const response = await fetch(`${HOST}/town`);
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Méthodes pour les terrains

  async fetchField() {
    try {
      const response = await fetch(`${HOST}/field`);
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async addField(fieldData) {
    try {
      const response = await fetch(`${HOST}/field/add`, {
        method: "POST",
        headers: {
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
    try {
      const response = await fetch(`${HOST}/product`);
      const data = await response.json();
      console.log('produits récup',data);
      return [data];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async addProduct(productData) {
    console.log('productData',productData);
    try {
      const response = await fetch(`${HOST}/productUpload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: productData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding product:", error);
      return [];
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await fetch(`${HOST}/product/delete/${productId}`, {
        method: "POST",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting product:", error);
      return [];
    }
  }
}

export default ApiCalls;
