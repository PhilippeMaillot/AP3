const button = document.getElementById("testCookie");
button.addEventListener("click", fetchAPIAndSaveToken);

function testCookie(token) {
  document.cookie = `token=${token}`;
}

function fetchAPIAndSaveToken() {
  axios.post("http://localhost:8080/test/cookie")
    .then((response) => {
      const token = response.data.token;
      console.log("Token reçu :", token);
      // Ici, vous pouvez utiliser le token comme vous le souhaitez
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

console.log("JavaScript code loaded successfully!");
