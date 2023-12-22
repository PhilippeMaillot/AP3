const button = document.getElementById("testCookie");
button.addEventListener("click", fetchAPIAndSaveToken);

function fetchAPIAndSaveToken() {
  console.log('Fetching token...')
  axios.post("http://localhost:8080/test/cookie", {}, { withCredentials: true })
    .then((response) => {
      console.log("Response received");
      // Ici, vous pouvez vérifier si le cookie est stocké
      console.log("Cookies actuellement stockés:", document.cookie);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

console.log("JavaScript code loaded successfully!");

document.getElementById("Cookie?").addEventListener("click", ()=>{
  alert(document.cookie);
});
