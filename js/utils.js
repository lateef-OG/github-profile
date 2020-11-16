//Toggle mobile navigation menu
const toggleMobileNav = () => {
    var x = document.getElementById("search-nav");
    if (x.className === "search-nav") {
        x.className += " show-menu";
    } else {
        x.className = "search-nav";
    }
}

//Check when profile picture is out of viewport.
const observer = new IntersectionObserver((entries) => {
    // isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlap
    var avatar = document.getElementById("avatar-name");
    if (entries[0].isIntersecting === false) {
        avatar.className = "avatar-name show"
    }
    else {
        avatar.className = "avatar-name hide"
    }
}, { threshold: [0] });

observer.observe(document.querySelector("#profile-avatar"));