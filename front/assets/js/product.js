import ApiCalls from "./apiCalls.js";
const api = new ApiCalls();
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
    product_img: document.getElementById("selectedImage").value,
    stock: document.getElementById("productStock").value
  };
  api.addProduct(formData)
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

function afficherPopup(imageUrl) {
  const popupElement = document.getElementById("popup");
  popupElement.innerHTML = `<img src="${imageUrl}" alt="Image en popup">`;
  popupElement.style.display = "block";
}

function masquerPopup() {
  const popupElement = document.getElementById("popup");
  popupElement.style.display = "none";
}

const selectElement = document.getElementById("selectedImage");
selectElement.addEventListener("change", function (event) {
  const selectedOption = event.target.selectedOptions[0];
  const filename = selectedOption.value;
  const imagePath = selectedOption.style.backgroundImage.replace(
    /url\(['"]?(.*?)['"]?\)/i,
    "$1"
  );
  if (filename === "") {
    masquerPopup();
    return;
  }
  console.log("imagePath:", imagePath);
  afficherPopup(imagePath);
});

api.checkAdmin();
api.showImages();
