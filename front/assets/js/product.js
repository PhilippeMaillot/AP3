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
  addProductForm.addEventListener("submit", handleUpload);

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

function handleUpload(event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;
    const productStock = document.getElementById("productStock").value;
    const productImage = document.getElementById("productImage").files[0];
    console.log(productImage);

    const sanitizeHtml = (string) => {
        const temp = document.createElement("div");
        temp.textContent = string;
        return temp.innerHTML;
      };
    const formData = {
    product_title: sanitizeHtml(productName),
    product_description: sanitizeHtml(productDescription),
    product_price: sanitizeHtml(productPrice),
    stock: sanitizeHtml(productStock),
    product_image: productImage
    }

    api.addProduct(formData)
        .then((response) => {
            // Réponse de l'API après l'ajout du produit
            console.log("Réponse de l'API :", response);
            // Mettre à jour l'affichage des produits
            api.fetchProducts()
                .then((products) => {
                    allProducts = products[0];
                    displayProducts(allProducts);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                });
        })
        .catch((error) => {
            console.error("Error adding product:", error);
        });
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

api.checkAdmin();
