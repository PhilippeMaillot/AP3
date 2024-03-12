import ApiCalls from "./apiCalls.js";
const api = new ApiCalls();
import HOST from "../config/config.js";
let allProducts = [];

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase();
    const filteredProducts = allProducts.filter((product) => {
      return product.product_title.toLowerCase().includes(searchTerm);
    });
    displayProducts(filteredProducts);
  });

  const addProductForm = document.getElementById("addProductForm");
  addProductForm.addEventListener("submit", handleAdd);

  api
    .fetchProducts()
    .then((products) => {
      allProducts = products[0];
      displayProducts(allProducts);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
});

function displayProducts(products) {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${product.product_title}</td>
            <td>${product.product_price}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn" data-id="${product.id_product}" type="button">Modifier</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id_product}" type="button">Supprimer</button>
            </td>
        `;
    tableBody.appendChild(row);
  });

  tableBody.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", handleEdit);
  });

  tableBody.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", handleDelete);
  });
}

function handleAdd(event) {
  event.preventDefault();

  const formData = {
    product_title: document.getElementById("productTitle").value,
    product_description: document.getElementById("productDescription").value,
    product_price: document.getElementById("productPrice").value,
    stock: document.getElementById("productStock").value,
    product_img: document.getElementById("selectedImage").value,
  };

  console.log("formData:", formData);
  const testImage = document.getElementById("file").files[0];
  console.log("testImage:", testImage);

  // Envoyer le formulaire
  fetch("http://localhost:8080/product/add", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  window.location.reload();
}

function handleEdit(event) {
  const productId = event.target.dataset.id;
  console.log("Modifier le produit avec l'ID:", productId);
}

function handleDelete(event) {
  const productId = event.target.dataset.id;
  api.deleteProduct(productId);
  event.target.closest("tr").remove();
  console.log("Supprimer le produit avec l'ID:", productId);
}

// Fonction pour afficher l'image dans le popup
function afficherPopup(imageUrl) {
  const popupElement = document.getElementById("popup");
  popupElement.innerHTML = `<img src="${imageUrl}" alt="Image en popup">`;
  popupElement.style.display = "block";
}

// Fonction pour masquer le popup
function masquerPopup() {
  const popupElement = document.getElementById("popup");
  popupElement.style.display = "none";
};

function showImages() {
  const selectElement = document.getElementById("selectedImage");

  // Réinitialiser le contenu du select
  selectElement.innerHTML = '<option value="">Sélectionnez une image</option>';

  // Fetch pour récupérer la liste des images depuis votre backend
  fetch(`${HOST}/product/images`)
    .then((response) => response.json())
    .then((data) => {
      // Ajouter les options au select avec l'image comme arrière-plan
      data.forEach((image) => {
        const option = document.createElement("option");
        option.value = image.filename; // Assurez-vous que cette valeur correspond à ce que vous voulez envoyer dans votre formulaire
        option.textContent = image.filename; // Vous pouvez également afficher le nom de fichier
        console.log("image path :", image.path);
        option.style.backgroundImage = `url('${HOST}${image.path}')`; // Définir l'image comme arrière-plan
        option.style.backgroundSize = "cover"; // Ajuster la taille de l'image
        selectElement.appendChild(option); // Ajouter l'option au select
      });
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

// Sélectionner l'élément <select>
const selectElement = document.getElementById("selectedImage");

// Ajouter un gestionnaire d'événements pour l'événement change
selectElement.addEventListener("change", function(event) {
  // Récupérer l'option sélectionnée
  const selectedOption = event.target.selectedOptions[0];

  // Récupérer les informations de l'image
  const filename = selectedOption.value;
  const imagePath = selectedOption.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");

  // Afficher les informations de l'image dans la console
  console.log("Nom du fichier:", filename);
  console.log("Chemin de l'image:", imagePath);
  if (filename === "") {
    masquerPopup();
    return;
  }
  afficherPopup(imagePath)
});


api.checkAdmin();
showImages();
