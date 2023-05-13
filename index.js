if (localStorage.getItem("email") != undefined) {
  window.location.replace("http://localhost/pages/home/home.html");
} else {
  window.location.replace("http://localhost/pages/login/login.html");
}
