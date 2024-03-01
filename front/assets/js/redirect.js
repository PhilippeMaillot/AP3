import ApiCalls from "./apiCalls.js";
const api = new ApiCalls();
const page = 'index';
const isAdmin = await api.isAdmin();
if (isAdmin === true) {
  window.location.href = `./${page}-admin.html`;
}
