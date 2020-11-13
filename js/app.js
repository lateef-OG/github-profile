function toggleMobileNav() {
  var x = document.getElementById("search-nav");
  if (x.className === "search-nav") {
    x.className += " show-menu";
  } else {
    x.className = "search-nav";
  }
}